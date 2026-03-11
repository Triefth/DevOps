package com.devops.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "planes")
@Data 
public class Plan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long id;

    private String nombre;
    private String descripcion;
    private Double precio;

    @OneToMany(mappedBy = "plan", cascade = CascadeType.ALL)
    private List<Horario> horarios;
}