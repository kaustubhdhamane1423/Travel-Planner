// Add this to your DestinationController.java

package com.travv.backend.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/api/destinations")
public class DestinationController {

    @Value("${amadeus.api.key}")
    private String apiKey;

    @Value("${amadeus.api.secret}")
    private String apiSecret;

    private String accessToken = "";

    @GetMapping
    public ResponseEntity<?> getDestinations() {
        try {
            // Step 1: Get access token
            if (accessToken.isEmpty()) {
                accessToken = getAccessToken();
            }

            // Step 2: Call destination API (example: points of interest in a city)
            String url = "https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=48.8566&longitude=2.3522"; // Paris example

            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(accessToken);
            HttpEntity<String> entity = new HttpEntity<>(headers);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            return ResponseEntity.ok(response.getBody());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

  private String getAccessToken() {
    String url = "https://test.api.amadeus.com/v1/security/oauth2/token";

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

    String body = "grant_type=client_credentials&client_id=" + apiKey + "&client_secret=" + apiSecret;

    HttpEntity<String> entity = new HttpEntity<>(body, headers);

    RestTemplate restTemplate = new RestTemplate();

    ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
        url,
        HttpMethod.POST,
        entity,
        new ParameterizedTypeReference<Map<String, Object>>() {}
    );

    Map<String, Object> responseBody = response.getBody();
    return (String) responseBody.get("access_token");
}

}
