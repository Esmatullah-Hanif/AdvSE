/**
 * Application => Data (Network process to application)
 * Presentation => Data (Respresentation and Encryption)
 * Presentation => Data (Interhost communication)
 * Transport Segments (Source and Dist Port Numbers)
 * Network => Packets (Source and Dist IP Addresses)
 * Data Link => Frames (Source and Dist Mac Addresses)
 * Physical => Bit
 */

/**
 * The following Handler interface declares a method for building the chain of osi layer handlers.
 * It also declares a method for executing a request of layer based on data.
 */
interface Handler {
  setNext(handler: Handler): Handler;

  handle(request: string): string;
}

/**
 * The default chaining behavior (here OSI model layers chaining) can be implemented inside a base layer handler class.
 */
abstract class LayerHandler implements Handler {
  private nextHandler: Handler;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    // Returning a handler from here will let us link handlers in a
    // convenient way like this:
    // applicationLayer.setNext(presentationLayer).setNext(sessionLayer) .....;
    return handler;
  }

  public handle(request: string): string {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }

    return null;
  }
}

/**
 * All Concrete Layer Handlers either handle a request or pass it to the next handler
 * in the chain.
 */
class Application extends LayerHandler {
  public handle(request: string): string {
    if (request === "app data") {
      return `Application Layer: Processing ${request} ...`;
    }
    return super.handle(request);
  }
}

class Presentation extends LayerHandler {
  public handle(request: string): string {
    if (request === "encryption") {
      return `Presentation Layer: Processing ${request} and represetation of data...`;
    }
    return super.handle(request);
  }
}

class Session extends LayerHandler {
  public handle(request: string): string {
    if (request === "interhost") {
      return `Session: Processing ${request} communication...`;
    }
    return super.handle(request);
  }
}

class Transport extends LayerHandler {
  public handle(request: string): string {
    if (request === "segment") {
      return `Transport Layer: Processing ${request}...`;
    }
    return super.handle(request);
  }
}

class Network extends LayerHandler {
  public handle(request: string): string {
    if (request === "packet") {
      return `Presentation: Processing  ${request}...`;
    }
    return super.handle(request);
  }
}

class DataLink extends LayerHandler {
  public handle(request: string): string {
    if (request === "frame") {
      return `Data Link Layer: Frames (Source and Dist Mac Addresses) -> Processing ${request}...`;
    }
    return super.handle(request);
  }
}

class Physical extends LayerHandler {
  public handle(request: string): string {
    if (request === "bits") {
      return `Physical Layer: Bits transferr -> Processing ${request}...`;
    }
    return super.handle(request);
  }
}
/**
 * The client code is usually suited to work with a single handler. In most
 * cases, it is not even aware that the handler is part of a chain.
 */
function clientCode(handler: Handler) {
  const layerProcessingUnits = ["app data", "encryption", "interhost", "segment", "packet", "bits"];

  for (const layerUnit of layerProcessingUnits) {
    console.log(`OSI Model: which layer processes ${layerUnit}?`);

    const result = handler.handle(layerUnit);
    if (result) {
      console.log(`  ${result}`);
    } else {
      console.log(`  ${layerUnit} was left unprocessed and untouched.`);
    }
  }
}

/**
 * The other part of the client code constructs the actual osi model chain.
 */
const applicationLayer = new Application();
const presentationLayer = new Presentation();
const sessionLayer = new Session();
const transportLayer = new Transport();
const networkLayer = new Network();
const dataLinkLayer = new DataLink();
const physicalLayer = new Physical();

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
