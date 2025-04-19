package com.travv.service;

import com.travv.backend.entity.Flight;
import com.travv.backend.model.FlightModel;
import com.travv.backend.repository.FlightRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FlightService {

    private final FlightRepository flightRepository;

    public FlightService(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    public List<FlightModel> searchFlights(String from, String to) {
        List<Flight> entities = flightRepository.findByFromLocationAndToLocation(from, to);
        return entities.stream()
                .map(this::convertToModel)
                .collect(Collectors.toList());
    }

    private FlightModel convertToModel(Flight flight) {
        FlightModel model = new FlightModel();
        model.setId(String.valueOf(flight.getId())); // assuming FlightModel expects a String
        model.setAirline(flight.getAirline());
        model.setFlightNumber(flight.getFlightNumber());
        model.setFromLocation(flight.getFromLocation());
        model.setToLocation(flight.getToLocation());
        model.setDepartureTime(flight.getDepartureTime());
        model.setArrivalTime(flight.getArrivalTime());
        model.setPrice((int) flight.getPrice()); // cast to int if required
        return model;
    }
}
