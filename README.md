# Bottle Royale

The current project is developed to tackle the problem presented by GateGroup global food and hospitality company about "Alcohol Bottle Handling" during the HackMTY 2025.
<br>

## Problem Introduction
Provided by GateGroup:
<br>
### Current Description

Alcohol bottle handling rules change among different client rules and agreements established on their contract. 

<br>

The possibilities to handle a specific bottle depend on:
- Client Policies (might or not be limited to a specific fill level)
- Fill level (0-100%)
- Seal status (Sealed / Opened)
- Label Status (Intact / Slighly Damaged / Heavily Damaged)
- Bottle Condition (Poor / Acceptable / Excelent)
- Cleanliness Score (Poor / Fair / Good / Excelent)

<br>

Due to this confusion, the employees responsible for handling the alcohol bottles after the catering event has ended (E.The plane arrived to its destination) are confused and many times take decision based on judgement without a set standard even though the rules are shown to them; leading to irregular results and unconsistencies.

<br>

### Presented Challenge

Design a software approach that can help automate these decisions so employees certainly know the right action to take based on the client guidelines. Securing efficiency and compliance with chosen rules. 

<br>

## Development

### Solution Approach 

Through a progressive web application we present a product for the employees handling the alcohol bottles after events.

Based on the client, by registering each alcohol bottle to manage through:

- Interactive Forms.
- Pythorch Machine Learning to make an object categorization.

The system determinates and shows the proper action to be taken on screen based on client policies, and registers each handling performed by the employee based on the bottles of a specific event.

<br>

### Application Work Flow

The shown workflow works around a series of three responsive and interactive screens that take the Employee of GateGroup through a Log In (based on GateGroup employee identification database); the selection of a specific airline and flight the trolley belongs to, at the specific facility where the employee is working; and the alcohol bottle register page which based on image classification, airline and country rules, a decision is taken which either:

1. Discards the bottle absolutely or based on a specified range.
2. Pass the bottle to the next flight of the airline.

After the decision is taken, either a new bottle can be register under tha same chosen conditions, or new conditions will be set by coming back to the main page.

The user is able to Log Out at the main page as well.

<p align="center">
  
<img width="400" height="4000" alt="Flowchart - BottleRoyale" src="https://github.com/user-attachments/assets/6737a55f-c28d-4bff-bb6c-6112195b208b" />

</p>


### Database Distribution


