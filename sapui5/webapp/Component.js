sap.ui.define([
    "sap/ui/core/UIComponent",
    "nryzy/sapui5/model/Models",
    "sap/ui/model/resource/ResourceModel",
    "./controller/HelloDialog"
    /** 
     * @param {typeof sap.ui.core.UIComponent} UIComponent
     * @param {typeof nryzy.sapui5.model.Models} Models
     * @param {typeof sap.ui.model.resource.ResourceModel} ResourceModel
     */

], function (UIComponent, Models, ResourceModel, HelloDialog) {
    //'use strict';
    // devolvemos una instancia del componente
    // A la instancia se le pasa la ruta del archivo y la lógica entre llaves
    return UIComponent.extend("nryzy.sapui5.Component", {
        
        metadata: {
            manifest: "json",
            // "rootView":{
            //     "viewName": "nryzy.sapui5.view.App",
            //     "type": "XML",
            //     "async": true,
            //     "id": "app"
            // }
        },

        init: function () {
            console.log("Pasa por el init de Component.js")
            // llamado a función init padre
            UIComponent.prototype.init.apply(this, arguments);
            // luego a esta misma vista le seteamos el modelo da la vista que acabamos de crear
            this.setModel(Models.createRecipient());
            // Seteamos el modelo i18n en la vista
            var i18nModel = new ResourceModel({ bundleName: "nryzy.sapui5.i18n.i18n" });
            // A diferencai del modelo anterior, acá le seteo un nombre que lo paso por parámetro
            // sólamente podemos tener 1 modelo sin nombre
            this.setModel(i18nModel, "i18n");

            // creo una nueva instancia del HelloDialog. A su vez, me pide como parámetro la instancia de la vista
            // this.getRootControl() me da la instancia de la vista de la cual está siendo llamada
            this._HelloDialog = new HelloDialog(this.getRootControl());
        },
 
        exit: function(){
            console.log("component.js exit")
            this._HelloDialog.destroy();
            delete this._HelloDialog;
        },

        openHelloDialog: function(){
            console.log("component.js openHelloDialog")
            this._HelloDialog.open();
        }
    })
});
