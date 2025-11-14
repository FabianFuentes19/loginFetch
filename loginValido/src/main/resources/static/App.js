document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const respuestaParrafo = document.getElementById("respuesta");

        let esValido = true;
        let mensajeError = "";

        if (nombre === "" || apellido === "" || correo === "") {
            mensajeError = "Todos los campos son obligatorios.";
            esValido = false;
        }

        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (esValido && !regexCorreo.test(correo)) {
            mensajeError = "Por favor, introduce un formato de correo electrónico válido.";
            esValido = false;
        }

        if (!esValido) {
            respuestaParrafo.textContent = "Error de validación: " + mensajeError;
            respuestaParrafo.className = "mensaje-error";
            return;
        } else {
            respuestaParrafo.textContent = "";
            respuestaParrafo.className = "";
        }

        const datos = {
            nombre: nombre,
            apellido: apellido,
            correo: correo
        };

        try {
            const respuesta = await fetch("/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos)
            });

            if (!respuesta.ok) {
                throw new Error(`Error en el servidor: ${respuesta.status}`);
            }

            const json = await respuesta.json();

            respuestaParrafo.textContent = json.mensaje;
            respuestaParrafo.className = "mensaje-exito";

        } catch (error) {
            console.error("Error en la solicitud:", error);
            respuestaParrafo.textContent = `Error de comunicación. ${error.message}`;
            respuestaParrafo.className = "mensaje-error";
        }
    });
});