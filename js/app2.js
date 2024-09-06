document.addEventListener("DOMContentLoaded", function(){
    
    const inputEmail = document.querySelector("#email");
    const inputCc = document.querySelector("#cc");
    const inputAsunto = document.querySelector("#asunto");
    const inputMensaje = document.querySelector("#mensaje");
    const formulario = document.querySelector("#formulario");
    const spinner = document.querySelector("#spinner");

    const btnReset = document.querySelector("#formulario button[type='reset']");
    const btnSubmit = document.querySelector("#formulario button[type='submit']");

    inputEmail.addEventListener("input", validar);
    inputCc.addEventListener("input", validar);
    inputAsunto.addEventListener("input", validar);
    inputMensaje.addEventListener("input", validar);

    btnReset.addEventListener("click", resetForm);
    formulario.addEventListener("submit", eventoSubmit);



    const cuerpoEmail = {
        email: "",
        cc: "",
        asunto: "",
        mensaje: ""
    };

    function validar(input){


        if(!(input.target.id === "cc") && input.target.value.trim() === ""){
            
            const mensajeError = `El campo ${input.target.id} está vacío`;
            const ubicacionError = input.target.parentElement;

            mostrarAlerta(mensajeError, ubicacionError);
            cuerpoEmail[input.target.id] = "";
            enviarFormulario();
            console.log(cuerpoEmail);
            return;
        };
        
        if(input.target.id === "email" && !validarEmail(input.target.value.trim()) || input.target.id === "cc" && !validarEmail(input.target.value.trim())){

            mostrarAlerta("El email no es valido", input.target.parentElement);
            cuerpoEmail[input.target.id] = "";
            enviarFormulario();
            console.log(cuerpoEmail);
            return;
        };

        ocultarAlerta(input.target.parentElement);

        cuerpoEmail[input.target.id] = input.target.value;

        enviarFormulario();

        console.log(cuerpoEmail);
        
    };

    function mostrarAlerta(mensajeError, ubicacionError){

        const exist = ubicacionError.querySelector(".formulario--alerta");
        
        if(exist){
            exist.remove();
        };
        
        const error = document.createElement("P");
        error.textContent = mensajeError;
        error.classList.add("formulario--alerta");

        ubicacionError.appendChild(error);

    };

    function ocultarAlerta(ubicacionError){

        const exist = ubicacionError.querySelector(".formulario--alerta");

        if(exist){
            exist.remove();
        };

    };

    function validarEmail(inputEmail){
        const validador =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
        return validador.test(inputEmail);
    };

    function enviarFormulario(){
        
        if(Object.values(cuerpoEmail).includes("")){
            btnSubmit.classList.add("opacity-50");
            btnSubmit.disabled = true;
            return;
        }
        
        btnSubmit.classList.remove("opacity-50");
        btnSubmit.disabled = false;
        
    }

    function resetForm(e){
        e.preventDefault();
        
        formulario.reset();
        cuerpoEmail.email = "";
        cuerpoEmail.cc = "";
        cuerpoEmail.asunto = "";
        cuerpoEmail.mensaje = "";
        enviarFormulario()
        console.log(cuerpoEmail);
    }

    function eventoSubmit(e){
        e.preventDefault()
        spinner.classList.add("flex");
        spinner.classList.remove("hidden");

        setTimeout(() => {
            spinner.classList.remove("flex");
            spinner.classList.add("hidden");

            const enviadoExito = document.createElement("P");
            enviadoExito.classList.add("bg-green-500", "flex", "text-white", "p-2", "text-center", "rounded-lg", "mt-10", "font-bold", "text-sm", "uppercase");
            enviadoExito.textContent = "Formulario enviado correctamente.";
            formulario.appendChild(enviadoExito);

            setTimeout(() => {
                formulario.removeChild(enviadoExito);
            }, 3000);

        }, 3500);
    }

    
})