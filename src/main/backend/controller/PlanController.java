package com.devops.controller; 

import com.tu.paquete.model.Plan;
import com.tu.paquete.repository.PlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/planes")
@CrossOrigin(origins = "http://localhost:3000") 
public class PlanController {

    @Autowired
    private PlanRepository planRepository;

    @GetMapping
    public List<Plan> obtenerTodosLosPlanes() {
        return planRepository.findAll();
    }
}