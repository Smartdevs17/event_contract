import { expect } from "chai";
import { ethers } from "hardhat";
import { EventManagement } from "../typechain-types";


describe("EventManagement contract", function () {
  let eventManagement: EventManagement;
  beforeEach(async function () {
    const EventManagement = await ethers.getContractFactory("EventManagement");
    eventManagement = await EventManagement.deploy();
  });

  it("should deploy the contract", async function () {
    const address = await eventManagement.getAddress();
    expect(address).to.properAddress;
  });

  it("should create a new event", async function () {
    const futureDate = Math.floor(Date.now() / 1000) + 3600; // 1 hour in the future
    await eventManagement.createEvent("Event Description", futureDate, 2000, 1);
    const event = await eventManagement.getEventDetails(1);
    expect(event.id).to.equal(1);
    expect(event.name).to.equal("Event Description");
  });

  it("should get an event by id", async function () {
    const futureDate = Math.floor(Date.now() / 1000) + 3600; // 1 hour in the future
    await eventManagement.createEvent("Event Description", futureDate, 2000, 1);
    const event = await eventManagement.getEventDetails(1);
    expect(event[0]).to.equal(1);
    expect(event[1]).to.equal("Event Description");
  });

  it("should allow participation in an event and get the correct participation counts", async function () {
    const futureDate = Math.floor(Date.now() / 1000) + 3600; // 1 hour in the future
    await eventManagement.createEvent("Event Description", futureDate, 4000, 1);
    await eventManagement.buyTicket(1, { value: 4000 });
    const event = await eventManagement.getEventDetails(1);
    expect(event.ticketsSold).to.equal(1);
    expect(event.ticketPrice).to.equal(4000);
    expect(event.ticketCount).to.equal(1);
  });

  it("should get the event details", async function () {
    const futureDate = Math.floor(Date.now() / 1000) + 3600; // 1 hour in the future
    await eventManagement.createEvent("Event Description", futureDate, 2000, 1);
    const event = await eventManagement.getEventDetails(1);
    expect(event.id).to.equal(1);
    expect(event.name).to.equal("Event Description");
    expect(event.date).to.equal(futureDate);
    expect(event.ticketPrice).to.equal(2000);
    expect(event.ticketCount).to.equal(1);
  });
});