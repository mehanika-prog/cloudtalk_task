package api

import (
	"encoding/json"
	"net/http"
	"strings"
)

// Temperature ...
type Temperature struct {
	Low  int `json:"low"`
	High int `json:"high"`
}

// Spot ...
type Spot struct {
	ID          string      `json:"id"`
	City        string      `json:"city"`
	Temperature Temperature `json:"temperature"`
}

// Response ...
type Response struct {
	Success bool   `json:"success"`
	Data    []Spot `json:"data"`
}

// http://meteo.shmu.sk/customer/home/opendata/?observations;date=10.03.2021:18
func getTemperature(id string) Response {

	return Response{}

}

func getTemperatures() Response {

	return Response{}

}

// TemperatureController ...
func TemperatureController(w http.ResponseWriter, r *http.Request) {

	w.Header().Add("content-type", "application/json")

	switch r.Method {

	case "GET":

		var res Response

		urlParts := strings.Split(r.URL.String(), "/")

		if len(urlParts) > 3 {

			res = getTemperature(urlParts[3])

		} else {

			res = getTemperatures()

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
