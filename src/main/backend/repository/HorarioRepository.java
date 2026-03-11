package com.devops.repository;

import com.tu.paquete.model.Horario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HorarioRepository extends JpaRepository<Horario, Long> {
    
    List<Horario> findByDisponibleTrue();

    List<Horario> findByPlanId(Long planId);
}