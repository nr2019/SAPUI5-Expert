sap.ui.define([
    // Definiciones AMD
    "sap/ui/core/mvc/Controller",  // Para realizar la instancia del controlador
    "sap/m/MessageToast"  // Para realizar la instancia del controlador
],
    /**
     * 
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.m.MessageToast} MessageToast
     */
    // Hicimos esto para que el Text sea tipado y me de el menú de opciones cuando pongo punto
    function (Controller, MessageToast) { //Lo paso como parámetro
        "use strict"; //Obliga a programar tipificando de cierta manera, esto ayuda a que luego los errores de consola sean más amigables
        // Acá hay que devolver una instancia del controlador, para eso extendemos el controlador estándar
        // indicándole la ruta de nuestro controlador
        return Controller.extend("nryzy.sapui5.controller.HelloPanel", {
            // Todos los controladores tienen el onInit para implementar, es lo primero que corre
            onInit: function () {
                console.log("pasa por el on init del HelloPanel.controller")
            },
            onMostrarSaludo: function () {
                console.log("HelloPanel controller onMostrarSaludo")
                //MessageToast.show("Hola mundo!");
                // Lectura de texto desde modelo i18n
                var oBundle = this.getView().getModel("i18n").getResourceBundle();
                var sRecipient = this.getView().getModel().getProperty("/recipient/name");
                var sMsg = oBundle.getText("helloMsg", [sRecipient]);
                MessageToast.show(sMsg);
            },

            onOpenDialog: function () {
                console.log("HelloPanel.controller onOpenDialog")
                this.getOwnerComponent().openHelloDialog();
            }

        });
    });
