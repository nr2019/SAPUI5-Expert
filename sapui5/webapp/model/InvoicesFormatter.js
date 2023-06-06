//@ts-nocheck
sap.ui.define([], 

function() {
    
    return {
        invoiceStatus: function(sStatus){
            console.log("Función formatter");
            // me traigo el modelo i18n definido en el manifest.json de la vista actual
            // luego con el getResourceBundle traigo los valores que contiene.
            // De esta manera puedo dinamizar las traducciones
            const resourceBundle = this.getView().getModel("i18n").getResourceBundle();
            switch (sStatus) {
                case 'A': return resourceBundle.getText("invoiceStatusA");
                case 'B': return resourceBundle.getText("invoiceStatusB");    
                case 'C': return resourceBundle.getText("invoiceStatusC");   
                default: return sStatus;     
            }
            
        }
    }
});