package dto

// Temperature ...
type Temperature struct {
	Low  float32 `json:"low"`
	High float32 `json:"high"`
}

// Spot ...
type Spot struct {
	City        string      `json:"city"`
	Temperature Temperature `json:"temperature"`
}

// OResponse ...
type OResponse struct {
	Success bool `json:"success"`
	Page    int
	Data    []Spot `json:"data"`
}
