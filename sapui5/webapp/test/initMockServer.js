//@ts-nocheck
sap.ui.define([
    "../localService/mockserver",
    "sap/m/MessageBox"
],
/**
 * 
 * @param { typeof sap.m.MessageBox} MessageBox
 */

function(mockserver, MessageBox) {
    'use strict';
    var aMockServers = [];

    //Inicializa el mock server
    aMockServers.push(mockserver.init());
    Promise.all(aMockServers).catch(function(oError){
        MessageBox.error(oError.message);
    }).finally( function(){
        // Se carga como dependencia el module que iniciaría el index.html
        sap.ui.require(["sap/ui/core/ComponentSupport"]);
    });
    
});