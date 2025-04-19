package com.travv.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")  // Allow requests from React frontend
@RestController
@RequestMapping("/api")
public class AIItineraryController {

    @PostMapping("/ai-itinerary")
    public ResponseEntity<Map<String, String>> generateItinerary(@RequestBody Map<String, String> request) {
        String destination = request.get("destination");
        int days = Integer.parseInt(request.get("days"));
        String type = request.get("type");

        String itinerary = "AI-generated itinerary to " + destination +
                           " for " + days + " days, focused on " + type + ".";

        Map<String, String> response = new HashMap<>();
        response.put("itinerary", itinerary);

        return ResponseEntity.ok(response);
    }
}
