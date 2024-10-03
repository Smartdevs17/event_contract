// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract EventManagement {
    struct Event {
        uint id;
        string name;
        uint date;
        uint ticketPrice;
        uint ticketCount;
        uint ticketsSold;
    }

    mapping(uint => Event) public events;
    uint public eventCount;

    event EventCreated(uint id, string name, uint date, uint ticketPrice, uint ticketCount, uint ticketsSold);
    event TicketBought(uint eventId, address buyer, uint ticketPrice);
    function createEvent(string memory _name, uint _date, uint _ticketPrice, uint _ticketCount) public {
        require(_date > block.timestamp, "Event date must be in the future");
        require(_ticketCount > 0, "Ticket count must be greater than zero");

        events[eventCount + 1] = Event({
            id: eventCount + 1,
            name: _name,
            date: _date,
            ticketPrice: _ticketPrice,
            ticketCount: _ticketCount,
            ticketsSold: 0
        });

        eventCount++;
        emit EventCreated(eventCount, _name, _date, _ticketPrice, _ticketCount, 0);
    }

    function buyTicket(uint _eventId) public payable {
        Event storage myEvent = events[_eventId];
        require(block.timestamp < myEvent.date, "Event has already occurred");
        require(msg.value == myEvent.ticketPrice, "Incorrect ticket price");
        require(myEvent.ticketsSold < myEvent.ticketCount, "All tickets sold");

        myEvent.ticketsSold++;
        emit TicketBought(_eventId, msg.sender, myEvent.ticketPrice);
    }

    function getEventDetails(uint _eventId) public view returns (Event memory) {
        require(_eventId > 0 && _eventId <= eventCount, "Invalid event id");
        return events[_eventId];
    }

    
}
