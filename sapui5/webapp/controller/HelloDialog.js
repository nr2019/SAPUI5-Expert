// @ts-nocheck
sap.ui.define([
    "sap/ui/base/ManagedObject",
    "sap/ui/core/Fragment"
], 
/**
 * @param {typeof sap.ui.base.ManagedObject} ManagedObject
 * @param {typeof sap.ui.core.Fragment } Fragment
 */

function(ManagedObject, Fragment) {
    'use strict';
    return ManagedObject.extend("nryzy.sapui5.controller.HelloDialog", {
        constructor: function(oView){
            // la instancia de la vista va a llegar
            this._oView = oView;
            console.log("HelloDialog. constructor")
        },

        exit: function() {
            delete this._oView;
            console.log("HelloDialog. exit")
        },

        open: function(){
            const oView = this._oView;
            // Crear diálogo lazily
            // pregunta si está instanciado. lo ubica por ID
            if (!oView.byId("helloDialog")) {
                // como no tenemos el controlador, lo creamos
                let oFragmentController = {
                    // El objeto tiene una función definida
                    onCloseDialog : function() {
                        // Cierra la ventana de diálogo
                        oView.byId("helloDialog").close();
                    }
                };

                // Carga asíncrona del fragmento XML
                // la instancia no existe, la creo
                Fragment.load({
                    id: oView.getId(),
                    name: "nryzy.sapui5.view.HelloDialog",
                    controller: oFragmentController  // Acá le decimos a la ventana de diálogo que el controlador es helloPanell.controller
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    console.log("HelloDialog. open sin instanciar")
                    oDialog.open();
                });
            } else {
                console.log("HelloDialog. open ya instanciado")
                // La instancia ya existe, no lo instancio nuevamente
                oView.byId("helloDialog").open();
            }
        }
    });
});