import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// m: module builder object provided by Hardhat
export default buildModule("CounterModule", (m) => {
  //deploys the Counter contract
  const counter = m.contract("Counter"); 
  // Store the result of toggleUnlocked
  const toggleCall = m.call(counter, "toggleUnlocked");
  // make incBy wait for toggleUnlocked to complete
  m.call(counter, "incBy", [5n], { after: [toggleCall] });

  return { counter };
});
