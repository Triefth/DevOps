package com.devops.controller;

import com.devops.model.Horario;
import com.devops.repository.HorarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/horarios")
@CrossOrigin(origins = "http://localhost:3000") // Asumiendo que tu React corre en el puerto 3000
public class HorarioController {

    @Autowired
    private HorarioRepository horarioRepository;

    // React usará esto para saber qué cuadrados dibujar según el plan que se esté mirando
    @GetMapping("/plan/{planId}")
    public List<Horario> obtenerHorariosPorPlan(@PathVariable Long planId) {
        return horarioRepository.findByPlanId(planId);
    }

    // Esto se ejecuta cuando alguien hace CLIC en el cuadrado para reservarlo en esa ventana más grande que mencionaste
    @PutMapping("/{id}/reservar")
    public Horario reservarHorario(@PathVariable Long id) {
        // Buscamos el horario por su ID
        Horario horario = horarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Horario no encontrado"));
        
        // Lo marcamos como "no disponible" (ocupado)
        horario.setDisponible(false);
        
        // Guardamos el cambio en la base de datos
        return horarioRepository.save(horario);
    }
}