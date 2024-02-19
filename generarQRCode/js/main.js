

const btn = document.querySelector("#generarQR");
btn.addEventListener("click", generarQRCode);

function generarQRCode() {
    let qrCodeDiv = document.querySelector("#qrcode");
    let url = document.querySelector("#url").value;

    //Limpiar el QR anterior en caso de existir
    qrCodeDiv.innerHTML = "";

    if ((url.trim()).length < 1) {
        error("Ingresar la URL para generar el código QR");
        return;
    }    

    //Generar el código QR
    let qr = qrcode(0, 'M');
    qr.addData(url);
    qr.make();

    // Insertar la imagen del código QR en el contenedor
    // 9 especifica el tamañano de la imágen
    qrCodeDiv.innerHTML = qr.createImgTag(9); 

    //Limpiar campo de URL
    document.querySelector("#url").value = "";
}

const error = (msg) => {
    let existe = document.querySelector(".error");

    if(!existe){
        let p = document.createElement("P");
        p.classList.add("alert", "alert-danger", "fw-bold", "text-center", "error", "mt-3");
        p.textContent = msg;

        document.querySelector("#qrcode").appendChild(p);
        setTimeout(() => {
            p.remove();
        }, 3000);
    }
}

/*
    Especificaciones de la función para generar el QR: 
    
    let qr = qrcode(0, 'M');
    
    El primer parámetro, 0, especifica el nivel de corrección de errores del código QR. 
    Los códigos QR pueden contener cierta cantidad de redundancia para permitir la recuperación 
    de datos en caso de que el código se dañe o esté parcialmente obstruido (por ejemplo, debido a suciedad o daños). 
    El nivel de corrección de errores se clasifica en cuatro niveles: L, M, Q y H. 
    Cada nivel proporciona una mayor redundancia para la corrección de errores. 
    En este caso, 0 representa el nivel más bajo de corrección de errores, que es equivalente a L (Error Correction Level L).

    El segundo parámetro, 'M', especifica el modo de codificación. 
    En este caso, 'M' se refiere al modo de codificación estándar. 
    Este modo es adecuado para una amplia variedad de datos, incluidos textos alfanuméricos y URLs.

    En resumen, qrcode(0, 'M') configura la generación del código QR para utilizar el nivel de corrección de errores más bajo (L)
    y el modo de codificación estándar (M). 
    Esto significa que el código QR será más compacto pero menos resistente a los errores en comparación 
    con los niveles de corrección de errores más altos. Dependiendo de tus necesidades específicas, 
    puedes ajustar estos parámetros según sea necesario. 
    Por ejemplo, puedes aumentar el nivel de corrección de errores o cambiar el modo de codificación
    si esperas que el código QR pueda enfrentar condiciones adversas.
*/