document.addEventListener("DOMContentLoaded", function(){

    const inputEmail     =  document.querySelector( "#email"   );
    const inputAsunto    =  document.querySelector( "#asunto"  );
    const inputMensaje   =  document.querySelector( "#mensaje" );

    const formularioPrincipal =  document.querySelector("#formulario");

    const spinner = document.querySelector("#spinner")

    const btnSubmit      =  document.querySelector("#formulario button[type='submit']");
    const btnReset       =  document.querySelector("#formulario button[type='reset']");

    inputEmail.addEventListener  ("input", validate);
    inputAsunto.addEventListener ("input", validate);
    inputMensaje.addEventListener("input", validate);
    formularioPrincipal.addEventListener("submit", enviarFormulario)

    btnReset.addEventListener("click", formatearFormulario);

    const emailCompeto = {
        email: "",
        asunto: "",
        mensaje: ""
    }

    function validate(input){

        if(input.target.value.trim() === ''){

            showAlert(`El campo ${input.target.id} está vacío`, input.target.parentElement);

            emailCompeto[input.target.id] = '';

            comprobarEmail()

            return;

        };

        if(input.target.id === "email" && !validarEmail(input.target.value)){

            showAlert("El email no es valido", input.target.parentElement);

            emailCompeto[input.target.id] = '';

            comprobarEmail()

            return;
        }
        
        hideAlert(input.target.parentElement);

        emailCompeto[input.target.id] = input.target.value.trim().toLowerCase();

        comprobarEmail()

    }

    function showAlert(message, reference){

        const existAlert = reference.querySelector(".formulario--alerta");

        if(existAlert){

            existAlert.remove();

        }

        const alert = document.createElement("P");
        alert.textContent = message;
        alert.classList.add("formulario--alerta");

        reference.appendChild(alert);

    };

    function hideAlert(reference){

        const existAlert = reference.querySelector(".formulario--alerta");

        if(existAlert){

            existAlert.remove();

        }

    }

    function validarEmail(email){
        const regex  =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const result = regex.test(email);
        return result;
    }

    function comprobarEmail(){
        if(Object.values(emailCompeto).includes('')){
            btnSubmit.classList.add("opacity-50");
            btnSubmit.disabled = true;

            return;
        }

        btnSubmit.classList.remove("opacity-50");
        btnSubmit.disabled = false;
        
    }

    function formatearFormulario(e){
        e.preventDefault();
        formularioPrincipal.reset();
        emailCompeto.email = '';
        emailCompeto.asunto = '';
        emailCompeto.mensaje = '';
        comprobarEmail();
        // console.log(emailCompeto);
    }

    function enviarFormulario(e){
        e.preventDefault();

        spinner.classList.add("flex")
        spinner.classList.remove("hidden") 

        setTimeout(() => {
            spinner.classList.remove("flex")
            spinner.classList.add("hidden")  
            
            

            const enviadoExito = document.createElement("P");
            enviadoExito.classList.add("bg-green-500", "flex", "text-white", "p-2", "text-center", "rounded-lg", "mt-10", "font-bold", "text-sm", "uppercase");
            enviadoExito.textContent = "Formulario enviado correctamente.";
            formularioPrincipal.appendChild(enviadoExito);

            setTimeout(() => {
                formularioPrincipal.removeChild(enviadoExito);
            }, 3000);
        }, 3000);

        
    }

    
});