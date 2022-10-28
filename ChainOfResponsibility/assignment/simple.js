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
  constructor(msg = "") {
    this._message = msg;
  }
  application(value) {
    this._message += value;
    return this;
  }
  presentation() {
    this._message += "fD23@#$D@#D";
    return this;
  }
  session(sourceId, destId) {
    this._message += sourceId + destId;
    return this;
  }
  transport(sourcePort, destPort) {
    this._message += sourcePort + destPort;
    return this;
  }
  network(sourceIP, destIP) {
    this._message += sourceIP + destIP;
    return this;
  }
  datalink(sourceMAC, destMAC) {
    this._message += sourceMAC + destMAC;
    return this;
  }
  physical() {
    this._message = this._message
      .split("")
      .map(function (char) {
        return char.charCodeAt(0).toString(2);
      })
      .join(" ");
    return this;
  }
}
// usage 1; at sender side
const OSIMessage = new OSIModel();
console.log(
  OSIMessage.application("Hello")
    .presentation()
    .session("110", "120")
    .transport("3000", "5000")
    .network("192.168.11.254", "192.168.11.250")
    .datalink("00-B0-D0-63-C2-26", "10-D0-B0-12-A2-20")
    .physical()._message
);
