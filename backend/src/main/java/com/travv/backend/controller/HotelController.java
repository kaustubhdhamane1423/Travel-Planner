package com.travv.backend.controller;

import com.travv.backend.config.AmadeusConfig;
import com.travv.dto.HotelSearchRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequestMapping("/api/hotels")
public class HotelController {

    private final AmadeusConfig amadeusConfig;
    private final WebClient webClient = WebClient.create();

    @Autowired
    public HotelController(AmadeusConfig amadeusConfig) {
        this.amadeusConfig = amadeusConfig;
    }

    private Mono<String> getAccessToken() {
        return webClient.post()
                .uri("https://test.api.amadeus.com/v1/security/oauth2/token")
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .bodyValue("grant_type=client_credentials&client_id=" + amadeusConfig.getClientId() + "&client_secret=" + amadeusConfig.getClientSecret())
                .retrieve()
                .bodyToMono(Map.class)
                .map(map -> (String) map.get("access_token"));
    }

    @GetMapping("/city-code")
    public Mono<ResponseEntity<String>> getCityCode(@RequestParam String keyword) {
        return getAccessToken()
                .flatMap(token -> webClient.get()
                        .uri(uriBuilder -> uriBuilder
                                .scheme("https")
                                .host("test.api.amadeus.com")
                                .path("/v1/reference-data/locations")
                                .queryParam("keyword", keyword)
                                .queryParam("subType", "CITY")
                                .build())
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .retrieve()
                        .bodyToMono(String.class)
                        .map(response -> ResponseEntity.ok().body(response)));
    }

    @PostMapping("/search")
    public Mono<ResponseEntity<String>> searchHotels(@RequestBody HotelSearchRequest request) {
        return getAccessToken()
                .flatMap(token -> webClient.get()
                        .uri(uriBuilder -> uriBuilder
                                .scheme("https")
                                .host("test.api.amadeus.com")
                                .path("/v3/shopping/hotel-offers")
                                .queryParam("cityCode", request.getLocation()) // location will be city code like "DEL"
                                .queryParam("checkInDate", request.getCheckInDate())
                                .queryParam("checkOutDate", request.getCheckOutDate())
                                .queryParam("adults", request.getAdults())
                                .build())
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .retrieve()
                        .bodyToMono(String.class)
                        .map(response -> ResponseEntity.ok().body(response)));
    }
}
