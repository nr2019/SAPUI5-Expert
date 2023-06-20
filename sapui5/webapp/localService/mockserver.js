//@ts-nocheck
sap.ui.define([
    "sap/ui/core/util/MockServer",
    "sap/ui/model/json/JSONModel",
    "sap/base/util/UriParameters",
    "sap/base/Log"
], 
/**
 * 
 * @param { typeof sap.ui.core.util.MockServer } MockServer
 * @param { typeof sap.ui.model.json.JSONModel } JSONModel
 * @param { typeof sap.base.util.UriParameters } UriParameters
 * @param { typeof sap.base.Log } Log
 */


function(MockServer, JSONModel, UriParameters, Log) {
    'use strict';
    var oMockServer,
    _sAppPath = "nryzy/sapui5/",
    _sJsonFilesPath = _sAppPath + "localService/mockdata";
    var oMockServerInterface = {
        /**
         * inicializa el mock server asíncrono
         * @protected
         * @param {object} oOptionsParameter
         * @returns {Promise} una promesa que es resuelta cuando el mock server es iniciado
         */
        
        init: function(oOptionsParameter){
            // Si el oOptionsParameter lleva vacío, le pasa {} (o sea, vacío)
            var oOptions = oOptionsParameter || {};

            return new Promise(function(fnResolve, fnReject){
                var sManifestUrl = sap.ui.require.toUrl(_sAppPath + "manifest.json"),
                    oManifestModel = new JSONModel(sManifestUrl);

                oManifestModel.attachRequestCompleted(function(){
                    // Con este objeto puedo obtener los parámetros que llegan por/en URL
                    var oUriParameters = new UriParameters(window.location.href);
                    // parse manifest para local metadata URI
                    var sJsonFilesUrl = sap.ui.require.toUrl(_sJsonFilesPath);
                    var oMainDataSource = oManifestModel.getProperty("/sap.app/dataSources/mainService");
                    var sMetaDataUrl = sap.ui.require.toUrl(_sAppPath + oMainDataSource.settings.localUri);
                    // Asegurarse que hay una barra al cierre de la URL
                    var sMockServerUrl = oMainDataSource.uri && new URI(oMainDataSource.uri).absoluteTo(sap.ui.require.toUrl(_sAppPath)).toString();

                    // Creación del mock server, o parar la existencia de uno para reinicializarlo
                    if(!oMockServer){
                        oMockServer = new MockServer({
                            rootUri : sMockServerUrl
                        }); 
                    } else {
                        oMockServer.stop();
                    }
                    // Configurar el mock server con las opciones dadas o delay default  de 0.5s
                    MockServer.config({
                        autoRespond: true,
                        // en caso que no tenga los 1ros 2, le pasa 500 ms
                        autoRespondAfter: (oOptions.delay || oUriParameters.get("serverDelay") || 500)
                    });

                    // simula el  request usando los datos del mock
                    oMockServer.simulate(sMetaDataUrl, {
                        sMockdataBaseUrl : sJsonFilesUrl, //ojo con el captal letter de la variable
                        bGenerateMissingMockData : true
                    });
                    var aRequests = oMockServer.getRequests();
                    // crear una respuesta errónea para cada request
                    var fnResponse = function(iErrCode, sMessage, aRequest){
                        aRequest.response = function(oXhr){
                            oXhr.respond(iErrCode, {"Content-type": "text/plain;charset=utf-8"}, sMessage);
                        };
                    };

                    // Simula los errores metadata 
                    if(oOptions.metadataError || oUriParameters.get("metadataError")){
                        aRequests.forEach(function(aEntry){
                            if (aEntry.path.toString().indexof("$metadata") > -1){
                                fnResponse(500, "Error en metadata", aEntry);
                            }
                        });
                    };

                    // Simulación de error en request 
                    var sErrorParam = oOptions.errorType || oUriParameters.get("errorType");
                    var iErrorCode = sErrorParam === "badRequest" ? 400 : 500;

                    if (sErrorParam) {
                        aRequests.forEach(function(aEntry) {
                            fnResponse(iErrorCode, sErrorParam, aEntry);
                        });
                    };

                    // Seteo de request e inicio de servidor
                    oMockServer.setRequests(aRequests);
                    oMockServer.start();
                    Log.info("Ejecutando la App con mock data");
                    fnResolve();
                });
                oManifestModel.attachRequestFailed(function(){
                    var sError = "Error al cargar el application manifest";
                    Log.error(sError);
                    fnReject(new Error(sError));
                });
            });
        }
    };
    return oMockServerInterface;
});