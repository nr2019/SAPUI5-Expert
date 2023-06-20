sap.ui.define([
    "sap/ui/test/Opa5",
    //ahora importamos una librería para simular si el usuario da click en el botón y se abre el diálogo
    "sap/ui/test/actions/Press"
],
    /**
     * 
     * @param {typeof sap.ui.test.Opa5 } Opa5 
     * @param {typeof sap.ui.test.actions.Press } Press
     */

    function (Opa5, Press) {
        "use strict";
        //var sViewName = "nryzy.sapui5.view.HelloPanel";

        Opa5.createPageObjects({
            onTheAppPage: {
                actions: {
                    iSayHelloDialogButton: function () {
                        return this.waitFor({
                            id: "helloDialogButton",
                            //viewName: sViewName,
                            viewName: "nryzy.sapui5.view.HelloPanel",
                            actions: new Press(),
                            /*success: function () {
                                Opa5.assert.ok(true, "The " + sViewName + " view is displayed");
                            },*/
                            errorMessage: "Did not find the 'Say Hello Dialog Button' on the HelloPanel view"
                        });
                    }
                },
 
                assertions: {
                    iSeeTheHelloDialog: function () {
                        return this.waitFor({
                            controlType: "sap.m.Dialog",
                            success: function () {
                                Opa5.assert.ok(true, "The dialog was opened")
                            },
                            errorMessage: "Did not find the dialog control"
                        })
                    }
                }
            }
        });
    });
