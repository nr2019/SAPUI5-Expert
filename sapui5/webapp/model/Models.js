sap.ui.define([
    // Definiciones AMD
    "sap/ui/model/json/JSONModel"
],
    /**
     * 
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     */
    function ( JSONModel) { 
        "use strict";
        return {
            // devuelve instancia del modelo
            createRecipient: function(){
                var oData = {
                    recipient : {
                        name: "Mundo"
                    }
                };
                // creamos un modelo, con la info json
                return new JSONModel(oData);
            }
        }
});
