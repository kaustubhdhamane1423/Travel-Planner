package com.travv.backend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties("amadeus")
public class AmadeusConfig {
    private String clientId;
    private String clientSecret;

    // Getter for clientId
    public String getClientId() {
        return clientId;
    }

    // Setter for clientId
    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    // Getter for clientSecret
    public String getClientSecret() {
        return clientSecret;
    }

    // Setter for clientSecret
    public void setClientSecret(String clientSecret) {
        this.clientSecret = clientSecret;
    }
}
