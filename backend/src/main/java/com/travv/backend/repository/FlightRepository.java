package com.travv.backend.repository;

import com.travv.backend.entity.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FlightRepository extends JpaRepository<Flight, Integer> {
    List<Flight> findByFromLocationAndToLocation(String fromLocation, String toLocation);
}
