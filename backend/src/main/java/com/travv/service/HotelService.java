package com.travv.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class HotelService {

    private final WebClient webClient;

    public HotelService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder
                .baseUrl("https://travel-advisor.p.rapidapi.com")
                .defaultHeader("X-RapidAPI-Key", "d5975a47c3mshc2b10bad09d62b1p1fc805jsnf131c93a617c")
                .defaultHeader("X-RapidAPI-Host", "travel-advisor.p.rapidapi.com")
                .defaultHeader("Content-Type", "application/json")
                .build();
    }

    public Mono<String> searchHotels(String requestBodyJson) {
        return webClient.post()
                .uri("/hotels/v2/list?currency=USD&units=km&lang=en_US")
                .bodyValue(requestBodyJson)
                .retrieve()
                .bodyToMono(String.class);
    }

    public Mono<String> getHotelDetails(String requestBodyJson) {
        return webClient.post()
                .uri("/hotels/v2/get-details?currency=USD&units=km&lang=en_US")
                .bodyValue(requestBodyJson)
                .retrieve()
                .bodyToMono(String.class);
    }

    public Mono<String> getHotelOffers(String requestBodyJson) {
        return webClient.post()
                .uri("/hotels/v2/get-offers?currency=USD&units=km&lang=en_US")
                .bodyValue(requestBodyJson)
                .retrieve()
                .bodyToMono(String.class);
    }

    public Mono<String> getHotelFilters(String requestBodyJson) {
        return webClient.post()
                .uri("/hotel-filters/v2/list?lang=en_US&units=km&currency=USD")
                .bodyValue(requestBodyJson)
                .retrieve()
                .bodyToMono(String.class);
    }
}
