package com.travv.backend.controller;

import com.travv.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*") // for now, open to all; you can restrict later
public class GeminiController {

    @Autowired
    private GeminiService geminiService;

    @PostMapping("/generate-itinerary")
    public Mono<String> generateItinerary(@RequestBody UserPrompt prompt) {
        return geminiService.generateItinerary(prompt.getPrompt());
    }

    public static class UserPrompt {
        private String prompt;
        public String getPrompt() { return prompt; }
        public void setPrompt(String prompt) { this.prompt = prompt; }
    }
}
