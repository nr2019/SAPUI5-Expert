// @ts-nocheck
sap.ui.define([
    //dependencias
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    '../model/InvoicesFormatter',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'
],
    /**
     * 
     * @param { typeof sap.ui.core.mvc.Controller } Controller 
     * @param { typeof sap.ui.model.json.JSONModel } JSONModel
     * @param { typeof sap.ui.model.Filter } Filter
     * @param { typeof sap.ui.model.FilterOperator } FilterOperator
      */

    function (Controller, JSONModel, InvoicesFormatter, Filter, FilterOperator) {
        //'use strict';
        return Controller.extend("nryzy.sapui5.controller.InvoicesList", {
            // Formatter no es una función. Acá solamente estoy disponibilizando a la vista
            // lo que me traje en '../model/InvoicesFormatter' a través del formatter
            formatterI: InvoicesFormatter,
           
            onInit: function () {
                console.log("InvoicesList - onInit")

                var oViewModel = new JSONModel({
                    usd: "USD",
                    eur: "EUR"
                });
                // Se setea modelo en la vista
                //Como el controlador está asociado a una vista, puedo 
                // obtener la vista que "me llama". Luego le seteo un nombre al modelo
                this.getView().setModel(oViewModel, "currency");
            },
            
            //El objeto del evento oEvent recibido el trae lo busdcado en el buscador
            onFilterInvoices : function (oEvent){
                const aFilter = [];
                //esto devuelve el valor que se introdujo en el campo de búsqueda
                const sQuery = oEvent.getParameter("query");
                if (sQuery){
                    aFilter.push( new Filter("ProductName", FilterOperator.Contains,sQuery));
                };

                // Obtenemos el listado de la vista
                const oList = this.getView().byId("LiInvoiceList");
                // Obtenemos el contenido de la lista
                const oBinding = oList.getBinding("items");
                //Aplicamos los filtros sobre los datos
                oBinding.filter(aFilter);
            }
        })
    });