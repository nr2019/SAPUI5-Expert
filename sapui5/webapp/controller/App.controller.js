sap.ui.define([
    // Definiciones AMD
    "sap/ui/core/mvc/Controller",  // Para realizar la instancia del controlador

],
    /**
     * 
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    // Hicimos esto para que el Text sea tipado y me de el menú de opciones cuando pongo punto
    function (Controller) { //Lo paso como parámetro
        "use strict"; //Obliga a programar tipificando de cierta manera, esto ayuda a que luego los errores de consola sean más amigables
        // Acá hay que devolver una instancia del controlador, para eso extendemos el controlador estándar
        // indicándole la ruta de nuestro controlador
        return Controller.extend("nryzy.sapui5.controller.App", {
            // Todos los controladores tienen el onInit para implementar, es lo primero que corre
            onInit: function (){ 
                console.log("pasa por el on init del app.controller")
            },
            onOpenDialogHeader: function(){
                this.getOwnerComponent().openHelloDialog();
            }
        });
    });


