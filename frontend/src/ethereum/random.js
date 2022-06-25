import web3 from "./web3";
import Random from "./build/RandomNumberConsumer.json";

console.log("Random.abi", Random.abi);
//console.log(JSON.parse(Random.abi));
const instance = new web3.eth.Contract(
  Random.abi,
  // "0x242f9D376F5E81264C6285FD0214E55620b72ea4"
  // "0x7cb50f4ee345b2256671BbCc9f71ED450954a675"
  // "0xe825836023455Fdc3b90b8ca186E48878518108d"
  "0xfbA9ab787036E362E590Bd87741fa9E51Fe62743"
);

export default instance;
