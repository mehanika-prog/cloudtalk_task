package main

import (
	"log"
	"net/http"

	api "task.sk/john/api/controllers/api"
)

func main() {

	http.HandleFunc("/api/temperature", api.TemperatureController)
	http.HandleFunc("/api/temperature/", api.TemperatureController)
	log.Fatal(http.ListenAndServe(":8080", nil))

}
