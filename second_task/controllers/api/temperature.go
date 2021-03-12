package api

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"

	"task.sk/john/api/dto"
)

// GetLocations ...
func GetLocations() map[string]int {

	var locationsFileName = "locations.csv"
	var locationsFilePath = "./" + locationsFileName

	locationsMap := make(map[string]int)

	file, err := os.Open(locationsFilePath)

	if err != nil {
		log.Fatal(err)
	}

	reader := csv.NewReader(file)

	for {

		record, err := reader.Read()
		if err == io.EOF {
			break
		}

		cityID, err := strconv.Atoi(record[1])

		if err != nil {
			log.Fatal("Wrong locations format in " + locationsFilePath + "!")
		}

		locationsMap[record[0]] = cityID

	}

	return locationsMap

}

// GetLocationKeys ...
func GetLocationKeys(locations map[string]int) []string {

	keys := []string{}

	for k, _ := range locations {
		keys = append(keys, k)
	}

	return keys

}

// GetLocationKeys ...
func GetLocationValues(locations map[string]int) []int {

	values := []int{}

	for _, v := range locations {
		values = append(values, v)
	}

	return values

}

var locations = GetLocations()
var locationKeys = GetLocationKeys(locations)
var locationValues = GetLocationValues(locations)

var accuReqStr = dto.AccuReqStr{
	ServiceURL: "http://dataservice.accuweather.com/currentconditions/v1/",
	APIKey:     os.Getenv("ACCUKEY"),
}

func getResFromAccu(cityID int) dto.IResponseDetail {

	reqStr := accuReqStr.GetReqStr(cityID, "sk-sk", true)

	resp, err := http.Get(reqStr)

	if err != nil {
		fmt.Println(err.Error())
	}

	defer resp.Body.Close()

	data, err := io.ReadAll(resp.Body)

	if err != nil {
		fmt.Println(err.Error())
	}

	var body []dto.IResponseDetail

	fmt.Println(data)

	err = json.Unmarshal(data, &body)

	return body[0]

}

func getCurrentCondition(city string, page int) dto.OResponse {

	res := dto.OResponse{
		Success: false,
		Data:    []dto.Spot{},
	}

	if city == "all" {

		res.Success = true

		var pageSize = 5
		var maxValue = len(locationKeys)
		var startValue = (page - 1) * pageSize
		var endValue = page * pageSize

		if endValue > maxValue {
			endValue = maxValue
		}

		res.Page = page

		for i := startValue; i < endValue; i++ {

			resFromAccu := getResFromAccu(locationValues[i])

			res.Data = append(res.Data, dto.Spot{
				City: locationKeys[i],
				Temperature: dto.Temperature{
					Low:  resFromAccu.TemperatureSummary.Past12HourRange.Minimum.Metric.Value,
					High: resFromAccu.TemperatureSummary.Past12HourRange.Maximum.Metric.Value,
				},
			})

		}

	} else {

		cityID := locations[city]

		if cityID == 0 {
			return res
		}

		resFromAccu := getResFromAccu(cityID)

		res.Success = true

		res.Data = append(res.Data, dto.Spot{
			City: city,
			Temperature: dto.Temperature{
				Low:  resFromAccu.TemperatureSummary.Past12HourRange.Minimum.Metric.Value,
				High: resFromAccu.TemperatureSummary.Past12HourRange.Maximum.Metric.Value,
			},
		})

	}

	return res

}

// TemperatureController ...
func TemperatureController(w http.ResponseWriter, r *http.Request) {

	w.Header().Add("content-type", "application/json")

	switch r.Method {

	case "GET":

		var res dto.OResponse

		urlParts := strings.Split(r.URL.String(), "/")

		if len(urlParts) > 3 {

			res = getCurrentCondition(urlParts[3], 1)

		} else {

			page, err := strconv.Atoi(r.URL.Query().Get("page"))

			if err != nil {
				page = 1
			}

			res = getCurrentCondition("all", page)

		}

		jsonResponse, err := json.Marshal(res)

		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
		}

		w.WriteHeader(http.StatusOK)
		w.Write(jsonResponse)

	default:

		w.WriteHeader(http.StatusMethodNotAllowed)
		w.Write([]byte("Method not allowed!"))

	}
}
