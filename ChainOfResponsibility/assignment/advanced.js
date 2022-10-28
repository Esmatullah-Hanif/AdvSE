/**
 * Application => Data (Network process to application)
 * Presentation => Data (Respresentation and Encryption)
 * Session => Data (Interhost communication)
 * Transport Segments (Source and Dist Port Numbers)
 * Network => Packets (Source and Dist IP Addresses)
 * Data Link => Frames (Source and Dist Mac Addresses)
 * Physical => Bit
 */

class OSIModel {
  constructor(side = "sender") {
    this._message = "";
    this._side = side;
    this.message = {
      msg: "",
      encrypt: "",
      sessionSrcID: "",
      sessionDestID: "",
      srcPort: "",
      destPort: "",
      srcIP: "",
      destIP: "",
      srcMAC: "",
      destMAC: "",
    };
  }
  application(value) {
    this._message += value;
    this.message.msg += value;
    return this;
  }
  presentation() {
    this._message += "fD23@#$D@#D";
    this.message.encrypt += "fD23@#$D@#D";
    return this;
  }
  session(sourceId, destId) {
    this._message += sourceId + destId;
    this.message.sessionSrcID += sourceId;
    this.message.sessionDestID += destId;
    return this;
  }
  transport(sourcePort, destPort) {
    this._message += sourcePort + destPort;
    this.message.srcPort += sourcePort;
    this.message.destPort += destPort;
    return this;
  }
  network(sourceIP, destIP) {
    if (this._side === "reciver") {
      delete this.message.srcIP;
      delete this.message.destIP;
    } else {
      this._message += sourceIP + destIP;
      this.message.srcIP += sourceIP;
      this.message.destIP += destIP;
    }
    return this;
  }
  datalink(sourceMAC, destMAC) {
    if (this._side === "reciver") {
      delete this.message.srcMAC;
      delete this.message.destMAC;
    } else {
      this._message += sourceMAC + destMAC;
      this.message.srcMAC += sourceMAC;
      this.message.destMAC += destMAC;
    }
    return this;
  }
  physical(bits) {
    if (this._side === "reciever" && bits){
      bits = bits.split(" ");
      //convert from binary to decimals, then to characters.
      bits.map((elem) => String.fromCharCode(parseInt(elem, 2))).join("");
      console.log(bits);
      this._message = bits;
    } else {
      this._message = this._message
        .split("")
        .map(function (char) {
          return char.charCodeAt(0).toString(2);
        })
        .join(" ");
    }
    return this;
  }
}
// usage 1; at sender side
// const OSIMessage = new OSIModel("sender");
// console.log(
//   OSIMessage.application("Hello")
//     .presentation()
//     .session("110", "120")
//     .transport("3000", "5000")
//     .network("192.168.11.254", "192.168.11.250")
//     .datalink("00-B0-D0-63-C2-26", "10-D0-B0-12-A2-20")
//     .physical()._message
// );
// the same but for showing properties of object
// console.log(
//   OSIMessage.application("Hello")
//     .presentation()
//     .session("110", "120")
//     .transport("3000", "5000")
//     .network("192.168.11.254", "192.168.11.250")
//     .datalink("00-B0-D0-63-C2-26", "10-D0-B0-12-A2-20").message
// );

// usage 2; at reciever side
let recievedMsgBinary =
  "1001000 1100101 1101100 1101100 1101111 1100110 1000100 110010 110011 1000000 100011 100100 1000100 1000000 100011 1000100 110001 110001 110000 110001 110010 110000 110011 110000 110000 110000 110101 110000 110000 110000 110001 111001 110010 101110 110001 110110 111000 101110 110001 110001 101110 110010 110101 110100 110001 111001 110010 101110 110001 110110 111000 101110 110001 110001 101110 110010 110101 110000 110000 110000 101101 1000010 110000 101101 1000100 110000 101101 110110 110011 101101 1000011 110010 101101 110010 110110 110001 110000 101101 1000100 110000 101101 1000010 110000 101101 110001 110010 101101 1000001 110010 101101 110010 110000";

const OSIMessage2 = new OSIModel("reciever");

console.log(
  OSIMessage2.physical(recievedMsgBinary)._message
    // .datalink()
    // .network()
    // .transport()
    // .session()
    // .presentation()
    // .application()._message
);

