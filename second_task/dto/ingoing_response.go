package dto

// Data ...
type Data struct {
	Value    float32 `json:"Value"`
	Unit     string  `json:"Unit"`
	UnitType int     `json:"UnitType"`
}

// DataMI ...
type DataMI struct {
	Metric   Data `json:"Metric"`
	Imperial Data `json:"Imperial"`
}

// Direction ...
type Direction struct {
	Degrees   int    `json:"Degrees"`
	Localized string `json:"Localized"`
	English   string `json:"English"`
}

// DirectedDataMI ...
type DirectedDataMI struct {
	Direction Direction `json:"Direction"`
	Speed     DataMI    `json:"Speed"`
}

// GustData ...
type GustData struct {
	Speed DataMI `json:"Speed"`
}

// TendencyData ...
type TendencyData struct {
	LocalizedText string `json:"LocalizedText"`
	Code          string `json:"Code"`
}

// PrecipitationSummary ...
type PrecipitationSummary struct {
	Precipitation DataMI `json:"Precipitation"`
	PastHour      DataMI `lson:"PastHour"`
	Past3Hours    DataMI `json:"Past3Hours"`
	Past6Hours    DataMI `json:"Past6Hours"`
	Past9Hours    DataMI `json:"Past9Hours"`
	Past12Hours   DataMI `json:"Past12Hours"`
	Past18Hours   DataMI `json:"Past18Hours"`
	Past24Hours   DataMI `json:"Past24Hours"`
}

// RangeDataMI ...
type RangeDataMI struct {
	Minimum DataMI `json:"Minimum"`
	Maximum DataMI `json:"Maximum"`
}

// TemperatureSummary ...
type TemperatureSummary struct {
	Past6HourRange  RangeDataMI `json:"Past6HourRange"`
	Past12HourRange RangeDataMI `json:"Past12HourRange"`
	Past24HourRange RangeDataMI `json:"Past24HourRange"`
}

// IResponse ...
type IResponse struct {
	LocalObservationDateTime string `json:"LocalObservationDateTime"`
	EpochTime                int32  `json:"EpochTime"`
	WeatherText              string `json:"WeatherText"`
	WeatherIcon              int    `json:"WeatherIcon"`
	HasPrecipitation         bool   `json:"HasPrecipitation"`
	PrecipitationType        string `json:"PrecipitationType"`
	IsDayTime                bool   `json:"IsDayTime"`
	Temperature              DataMI `json:"Temperature"`
	MobileLink               string `json:"MobileLink"`
	Link                     string `json:"Link"`
}

// IResponseDetail ...
type IResponseDetail struct {
	LocalObservationDateTime       string               `json:"LocalObservationDateTime"`
	EpochTime                      int32                `json:"EpochTime"`
	WeatherText                    string               `json:"WeatherText"`
	WeatherIcon                    int                  `json:"WeatherIcon"`
	HasPrecipitation               bool                 `json:"HasPrecipitation"`
	PrecipitationType              string               `json:"PrecipitationType"`
	IsDayTime                      bool                 `json:"IsDayTime"`
	Temperature                    DataMI               `json:"Temperature"`
	RealFeelTemperature            DataMI               `json:"RealFeelTemperature"`
	RealFeelTemperatureShade       DataMI               `json:"RealFeelTemperatureShade"`
	RelativeHumidity               int                  `json:"RelativeHumidity"`
	IndoorRelativeHumidity         int                  `json:"IndoorRelativeHumidity"`
	DewPoint                       DataMI               `json:"DewPoint"`
	Wind                           DirectedDataMI       `json:"Wind"`
	WindGust                       GustData             `json:"WindGust"`
	UVIndex                        int                  `json:"UVIndex"`
	UVIndexText                    string               `json:"UVIndexText"`
	Visibility                     DataMI               `json:"Visibility"`
	ObstructionsToVisibility       string               `json:"ObstructionsToVisibility"`
	CloudCover                     int                  `json:"CloudCover"`
	Ceiling                        DataMI               `json:"Ceiling"`
	Pressure                       DataMI               `json:"Pressure"`
	PressureTendency               TendencyData         `json:"PressureTendency"`
	Past24HourTemperatureDeparture DataMI               `json:"Past24HourTemperatureDeparture"`
	ApparentTemperature            DataMI               `json:"ApparentTemperature"`
	WindChillTemperature           DataMI               `json:"WindChillTemperature"`
	WetBulbTemperature             DataMI               `json:"WetBulbTemperature"`
	Precip1hr                      DataMI               `json:"Precip1hr"`
	PrecipitationSummary           PrecipitationSummary `json:"PrecipitationSummary"`
	TemperatureSummary             TemperatureSummary   `json:"TemperatureSummary"`
	MobileLink                     string               `json:"MobileLink"`
	Link                           string               `json:"Link"`
}
