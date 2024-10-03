// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const EventManagementModule = buildModule("EventManagementModule", (m) => {

  const eventManagement = m.contract("EventManagement");
  return { eventManagement };
});

export default EventManagementModule;
