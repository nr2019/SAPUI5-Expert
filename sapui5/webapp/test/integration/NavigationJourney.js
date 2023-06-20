/*global QUnit*/

sap.ui.define([
	//el mock es para que arranque la aplicación
	"nryzy/sapui5/localService/mockserver",
	"sap/ui/test/opaQunit",
	// traemos la página en la que vamos a realizar la prueba
	"./pages/HelloPanel",
], 
/**
 * 
 * @param {typeof sap.ui.test.opaQunit} opaQunit
 */
function (mockserver, opaQunit) {
	"use strict";

	QUnit.module("Navigation Journey");

	opaQunit("Should see the initial page of the app", function (Given, When, Then) {
		// Inicializa el mock server
		mockserver.init();
		
		// Arrangements
		Given.iStartMyUIComponent({
			componentConfig: {
				name: "nryzy.sapui5"
			}
		});
		// Actions
		When.onTheAppPage.iSayHelloDialogButton();

		// Assertions
		//Then.onTheAppPage.iSeeHelloDialogButon();
		Then.onTheAppPage.iSeeTheHelloDialog();

      	//Then.onTheViewPage.iShouldSeeThePageView();

		//Cleanup 
		//Para liberar los recursos
		Then.iTeardownMyApp();
	});
}); 
