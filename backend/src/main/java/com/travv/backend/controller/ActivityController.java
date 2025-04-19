package com.travv.backend.controller;

import com.travv.backend.model.Activity;
import com.travv.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
@CrossOrigin(origins = "*")
public class ActivityController {

    @Autowired
    private ActivityService activityService;

    @GetMapping("/city/{city}")
    public List<Activity> getActivitiesByCity(@PathVariable String city) {
        return activityService.getActivitiesByCity(city);
    }

    @GetMapping
    public List<Activity> getAllActivities() {
        return activityService.getAllActivities();
    }
}
