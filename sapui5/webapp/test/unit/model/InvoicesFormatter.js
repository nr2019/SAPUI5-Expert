/*global QUnit*/

sap.ui.define([
    "nryzy/sapui5/model/InvoicesFormatter", //Para llegar al invoice status
    "sap/ui/model/resource/ResourceModel"
],
    /**
     * 
     * @param {typeof sap.ui.model.resource.ResourceModel} ResourceModel
     */

    function (InvoicesFormatter, ResourceModel) {
        "use strict";

        QUnit.module("QInvoices Status", {
            // antes de la ejecución de la unidad de test
            beforeEach: function () {
                this._oResourceModel = new ResourceModel({
                    bundleUrl: sap.ui.require.toUrl("nryzy/sapui5") + "/i18n/i18n.properties"
                });
            },
            //después de la ejecución de la unidad de test
            afterEach: function () {
                // se destruye la instancia creada en el before
                this._oResourceModel.destroy();
            }
        }
        );

        QUnit.test("Debería devolver el estado de la factura", function (assert) {
            //var oAppController = new Controller();
            //oAppController.onInit();
            //assert.ok(oAppController);
            let oModel = this.stub();
            oModel.withArgs("i18n").returns(this._oResourceModel);
            let oViewStub ={
                getModel : oModel
            };

            let oControllerStub = {
                getView : this.stub().returns(oViewStub)
            };

            let fnIsolatedFormatter = InvoicesFormatter.invoiceStatus.bind(oControllerStub);

            //Assert
            assert.strictEqual(fnIsolatedFormatter("A"),"New", "El estado de la factura para A es correcto");
            assert.strictEqual(fnIsolatedFormatter("B"),"In Progress", "El estado de la factura para B es correcto");
            assert.strictEqual(fnIsolatedFormatter("C"),"Done", "El estado de la factura para C es correcto");
        });

    });
