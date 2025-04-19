package com.travv.service;

import com.travv.backend.model.Activity;
import com.travv.backend.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepository activityRepository;

    public List<Activity> getActivitiesByCity(String city) {
        return activityRepository.findByCity(city);
    }

    public List<Activity> getAllActivities() {
        return activityRepository.findAll();
    }
}
