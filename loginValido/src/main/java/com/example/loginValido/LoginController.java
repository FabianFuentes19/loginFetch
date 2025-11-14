package com.example.loginValido;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class LoginController {
    @PostMapping(
            path = "/login",
            //enviar informacion con formato JASON
            consumes = MediaType.APPLICATION_JSON_VALUE,
            //DEVUELVE informacion con formato JASON

            produces = MediaType.APPLICATION_JSON_VALUE
    )

    public Map<String, String> login(@RequestBody Map<String, String> datos) {
        String nombre = datos.get("nombre");
        String apellido = datos.get("apellido");
        String correo = datos.get("correo");
        String mensaje = "Hola "+ nombre + " " + apellido+" bienvenido a springboot"+" "+correo;
        return Map.of("mensaje", mensaje);
    }

}
