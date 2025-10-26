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

### Challenge

Design a software approach that can help automate these decisions so employees certainly know the right action to take based on the client guidelines. Securing efficiency and compliance with chosen rules in benefit of GateGroup and its clients. 

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
  
<img width="479" height="3109" alt="Flowchart - BottleRoyale" src="https://github.com/user-attachments/assets/519b6d11-2578-4e54-9464-59edf41f5cfa" />

</p>


### Database Distribution

The data used for the proposed application is a combination of the existing databases of GateGroup and the creation or addition of concrete Entities or Fields to the overall database environment.

On the following Entity-Relationship Model (ER) a color distinction is established to divide:

- Red: Existing databases property of GateGroup or provided through third-party software hired by the before mentioned. The mentioned fields might already be contained or its addition might be required.
- Green: Specific new entity required by the application.

<br>
   <p align="center">
     <img width="600" height="600" alt="MER - AlcoholBottles" src="https://github.com/user-attachments/assets/a025434c-56e7-40de-8fed-7245908850d8" />
   </p>
 </br>

For testing purposes all the previous shown tables of the database have been provisionally created on MySQL and filled each with syntetic information to test the algorithm logic to take decisions based on specific airline (range) and country rugulations.

The SQL file that contains such testing information has been uploaded to the current repository under the title of **bottleroyale.sql**
 
