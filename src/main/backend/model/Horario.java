package com.devops.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalTime;

@Entity
@Table(name = "horarios")
@Data
public class Horario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String dia; // Ejemplo: "Lunes", "Martes"
    private LocalTime horaInicio; // Ejemplo: 10:00
    private LocalTime horaFin;    // Ejemplo: 11:00
    private boolean disponible;   // true = libre, false = ocupado

    // Muchos horarios pertenecen a un solo plan
    @ManyToOne
    @JoinColumn(name = "plan_id") // Así se llamará la columna en la base de datos que los conecta
    private Plan plan;
}