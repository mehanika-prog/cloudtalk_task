package dto

import "fmt"

// AccuReqStr ...
type AccuReqStr struct {
	ServiceURL string
	APIKey     string
}

// GetReqStr ...
func (a *AccuReqStr) GetReqStr(locationID int, language string, detail bool) string {

	reqStr := a.ServiceURL
	reqStr += fmt.Sprintf("%d", locationID)
	reqStr += "?apikey=" + "GmMFG73T5zbEdwhjKCFXCeaa9jNZPeMP" //a.APIKey
	reqStr += "&language=" + language

	if detail {
		reqStr += "&details=true"
	}

	return reqStr

}
