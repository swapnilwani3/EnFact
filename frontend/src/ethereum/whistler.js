import web3 from "./web3";
import Manager from "./build/whistler.json";

console.log("Manager.interface", Manager.interface);

const instance = new web3.eth.Contract(
  JSON.parse(Manager.interface),
  // "0x242f9D376F5E81264C6285FD0214E55620b72ea4"
  // "0x7498bE2d0A0D4025Aaa8487D2bE9E69d53c1D7C5"
  // "0xe825836023455Fdc3b90b8ca186E48878518108d"
  "0x19D9AF8aC423A5908F1dc1E80Cdd900c08D44bCd"
);

export default instance;
