/**
 * Application => Data (Network process to application)
 * Presentation => Data (Respresentation and Encryption)
 * Presentation => Data (Interhost communication)
 * Transport Segments (Source and Dist Port Numbers)
 * Network => Packets (Source and Dist IP Addresses)
 * Data Link => Frames (Source and Dist Mac Addresses)
 * Physical => Bit
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * The default chaining behavior (here OSI model layers chaining) can be implemented inside a base layer handler class.
 */
var LayerHandler = /** @class */ (function () {
    function LayerHandler() {
    }
    LayerHandler.prototype.setNext = function (handler) {
        this.nextHandler = handler;
        // Returning a handler from here will let us link handlers in a
        // convenient way like this:
        // applicationLayer.setNext(presentationLayer).setNext(sessionLayer) .....;
        return handler;
    };
    LayerHandler.prototype.handle = function (request) {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }
        return null;
    };
    return LayerHandler;
}());
/**
 * All Concrete Layer Handlers either handle a request or pass it to the next handler
 * in the chain.
 */
var Application = /** @class */ (function (_super) {
    __extends(Application, _super);
    function Application() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Application.prototype.handle = function (request) {
        if (request === "app data") {
            return "Application Layer: Processing ".concat(request, " ...");
        }
        return _super.prototype.handle.call(this, request);
    };
    return Application;
}(LayerHandler));
var Presentation = /** @class */ (function (_super) {
    __extends(Presentation, _super);
    function Presentation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Presentation.prototype.handle = function (request) {
        if (request === "encryption") {
            return "Presentation Layer: Processing ".concat(request, " and represetation of data...");
        }
        return _super.prototype.handle.call(this, request);
    };
    return Presentation;
}(LayerHandler));
var Session = /** @class */ (function (_super) {
    __extends(Session, _super);
    function Session() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Session.prototype.handle = function (request) {
        if (request === "interhost") {
            return "Session: Processing ".concat(request, " communication...");
        }
        return _super.prototype.handle.call(this, request);
    };
    return Session;
}(LayerHandler));
var Transport = /** @class */ (function (_super) {
    __extends(Transport, _super);
    function Transport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Transport.prototype.handle = function (request) {
        if (request === "segment") {
            return "Transport Layer: Processing ".concat(request, "...");
        }
        return _super.prototype.handle.call(this, request);
    };
    return Transport;
}(LayerHandler));
var Network = /** @class */ (function (_super) {
    __extends(Network, _super);
    function Network() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Network.prototype.handle = function (request) {
        if (request === "packet") {
            return "Presentation: Processing  ".concat(request, "...");
        }
        return _super.prototype.handle.call(this, request);
    };
    return Network;
}(LayerHandler));
var DataLink = /** @class */ (function (_super) {
    __extends(DataLink, _super);
    function DataLink() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataLink.prototype.handle = function (request) {
        if (request === "frame") {
            return "Data Link Layer: Frames (Source and Dist Mac Addresses) -> Processing ".concat(request, "...");
        }
        return _super.prototype.handle.call(this, request);
    };
    return DataLink;
}(LayerHandler));
var Physical = /** @class */ (function (_super) {
    __extends(Physical, _super);
    function Physical() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Physical.prototype.handle = function (request) {
        if (request === "bits") {
            return "Physical Layer: Bits transferr -> Processing ".concat(request, "...");
        }
        return _super.prototype.handle.call(this, request);
    };
    return Physical;
}(LayerHandler));
/**
 * The client code is usually suited to work with a single handler. In most
 * cases, it is not even aware that the handler is part of a chain.
 */
function clientCode(handler) {
    var layerProcessingUnits = ["app data", "encryption", "interhost", "segment", "packet", "bits"];
    for (var _i = 0, layerProcessingUnits_1 = layerProcessingUnits; _i < layerProcessingUnits_1.length; _i++) {
        var layerUnit = layerProcessingUnits_1[_i];
        console.log("OSI Model: which layer processes ".concat(layerUnit, "?"));
        var result = handler.handle(layerUnit);
        if (result) {
            console.log("  ".concat(result));
        }
        else {
            console.log("  ".concat(layerUnit, " was left unprocessed and untouched."));
        }
    }
}
/**
 * The other part of the client code constructs the actual osi model chain.
 */
var applicationLayer = new Application();
var presentationLayer = new Presentation();
var sessionLayer = new Session();
var transportLayer = new Transport();
var networkLayer = new Network();
var dataLinkLayer = new DataLink();
var physicalLayer = new Physical();
applicationLayer
    .setNext(presentationLayer)
    .setNext(sessionLayer)
    .setNext(transportLayer)
    .setNext(networkLayer)
    .setNext(dataLinkLayer)
    .setNext(physicalLayer);
/**
 * The OSI model could be able to send a request to any handler, not just the
 * first one in the chain.
 */
console.log("OSI Complete Chain: Application > Presentation > Session > Transport > Network > Data Link > Physical\n");
clientCode(applicationLayer);
console.log("");
console.log("OSI Subchain: Network > Data Link > Physical\n");
clientCode(networkLayer);
