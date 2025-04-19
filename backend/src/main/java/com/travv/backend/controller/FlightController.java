package com.travv.backend.controller;

import com.travv.backend.model.FlightModel;
import com.travv.service.FlightService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/flights")
@CrossOrigin(origins = "http://localhost:5173") // or whatever port your frontend is running on
public class FlightController {

    private final FlightService flightService;

    public FlightController(FlightService flightService) {
        this.flightService = flightService;
    }

    @GetMapping("/search")
    public List<FlightModel> searchFlights(@RequestParam String from, @RequestParam String to) {
        return flightService.searchFlights(from, to);
    }
}
