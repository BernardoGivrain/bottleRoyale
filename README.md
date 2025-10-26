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

<hr>

### Challenge

Design a software approach that can help automate these decisions so employees certainly know the right action to take based on the client guidelines. Securing efficiency and compliance with chosen rules in benefit of GateGroup and its clients. 

<br>

## Development

### Assumptions

Based on the information collected from the multiple interactions, questions and talks with the representatives of GateGroup at the HackMTY2025 the following assumptions have been taken:

- GateGroup company has a database of Employees and keep record of their information and the facility they work at. *
- GateGroup is responsible for setting an account for the employee to use at the presented application, reason why a Sign In is not implemented in the Log In page.
- GateGroup company has a database or has access to a database that keeps an updated record of the multiple flights of que associated airlines. *
- The greatest problem to tackle is the reduction of the human inconsistencies among the desicion taking processes.
- There are only two processes available to perform with an opened alcohol bottle for GateGroup: discard or keep, based on determined ranges.
- Beer, wine and small alcohol bottles are always **discarted**.
- At no moment any kind of licor of any brand is combined in order to save space into the same bottle. Instead, each kind of licor is maintained within each its original container only adding several bottles in order to meet client licor requirements, each on its individual container.


<br>

\* = Provitional Database has been created for testing purposes.


<br>

<hr>

### Solution Approach 

Through a progressive web application we present a product for the employees handling the alcohol bottles after events.

Based on the client, by registering each alcohol bottle to manage through:

<br>

  #### Interactive Forms
  
  Strategic recolection of data that is filtered thanks to the selection of Airline and Flight Entities, to obtain specific rules that determine the final decision of a determined alcohol bottle.
  
  Additional registration of the bottle size, licor type, brand, and upload of photography (analyzed through an object classification to determine fill level) leads to the decision making process which has been defined taking into priority regulations in the following level:
  
  1. National Regulations
  2. Airline Regulations
  
  Or any of which is the strictest regulation.

<br>

#### PyTorch Machine Learning to make an object categorization.

Model of Machine Learning developed in PyTorch trained with an approximate total of 100 images classified in four clusters that divide alcohol bottles into four main categories of fill level (0%-25%, 25%-50%, 50%-75% and 75%-100%) in order to determine a fill level for an image taken by the user eliminating the human approximation from the interaction.

<br>

The system determinates and shows the proper action to be taken on screen based on client policies, and registers each handling performed by the employee based on the bottles of a specific event.

<br>

<hr>

### Application Work Flow

The shown workflow works around a series of three responsive and interactive screens that take the Employee of GateGroup through a Log In (based on GateGroup employee identification database); the selection of a specific airline and flight the trolley belongs to, at the specific facility where the employee is working; and the alcohol bottle register page which based on image classification, airline and country rules, a decision is taken which either:

1. Discards the bottle absolutely or based on a specified range.
2. Pass the bottle to the next flight of the airline.

After the decision is taken, either a new bottle can be register under tha same chosen conditions, or new conditions will be set by coming back to the main page.

The user is able to Log Out at the main page as well.

<p align="center">
  
<img width="350" height="4500" alt="Flowchart - BottleRoyale" src="https://github.com/user-attachments/assets/519b6d11-2578-4e54-9464-59edf41f5cfa" />

</p>

<br>

<hr>

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
 
<br>

<hr>

###   Data Dictionaries

On the following section the Data Dictionary of each established entity and table in the relational database known as **bottleroyale** is shown for a further comprehension of each field and the relationship among them: 


<br>

 <p align="center">


Entity **airline**

| Name | Description | Type | Example |
| ---- | ------- | ------ | ----- |
| idAirline | ID of the airline. | int | 01 |
| name  | Name of the airline.  | varchar (30) | "Aeromexico" |
| rule | Rule that dictates how will be alcohol bottle handled based on the preestablished regulations with GateGroup and the provided range (if provided). | varchar (10) | "Discard" |
| range  | Range over which the rule will be enforced based on the Fill Level of the bottle handled. | float | 0.80 |

<br>

Entity **bottle**

| Name | Description | Type | Example |
| ---- | ------- | ------ | ----- |
| idBottle | ID of the Bottle per each Bottle Management process. | int | 01 |
| idBM | ID that relates the Bottle to its Bottle Management process. | int | 01 |
| licor | Type of licor being handled | varchar (20) | "Whiskey" |
| size | Maximum capacity of the bottle in ml (mililiters) | int | 1000 |
| brand | Brand of the licor being handled. | varchar (30) | "Johny Walker" |
| decision | Decision taken by the algorithm that can be either discard the bottle or pass it to the next flight of the airline, based on airline and country regulations. | tinyint | true | 
| fillLevel | Fill level of the alcohol bottle approximated by the learning and recognition of images established within [0.0, 1.0] | float | 0.80 |

<br>


Entity **bottlemanagement**

| Name | Description | Type | Example |
| ---- | ------- | ------ | ----- |
| idBM | ID of the Bottle Management process started by a specific flight by a specific employee. | int | 01 | 
| idEmployee | ID of the Employee who is responsible for the Bottle Management process. | int | 01 |
| dateAssigned | Date and time whenever the Bottle Management was started. | timestamp | "YYYY-MM-DD hh:mm:ss" |
| idFlight | ID of the Flight whose trolleys are being reviewed by the Employee on the Bottle Management process. | int | 01 |

<br>


Entity **country**

| Name | Description | Type | Example |
| ---- | ------- | ------ | ----- |
| idCountry | ID of a country references to a specific flight (in this case only the Arrival is taken). | int | 01 |
| name | Name of the country. | varchar (50) | "Mexico" |
| rule | Rule that dictates how will be alcohol bottle handled based on the country alcohol policies and regulations. | varchar (10) | "Discard" |


<br>


Entity **employee**

| Name | Description | Type | Example |
| ---- | ------- | ------ | ----- |
| idEmployee | ID of a determined employee under the GateGroup corporation system. | int | 01 |
| username | Username of the employee. | varchar (50) | "JuanMartinez2" |
| password | Password of the employee to access the GateGroup system. | varchar (20) | "gateMart0102" |
| idFacility | ID of the facility where the employee works. | int | 01 |


<br>


Entity **facility**

| Name | Description | Type | Example |
| ---- | ------- | ------ | ----- |
| idFacility | ID that identifies a specific facility where N employees work under the GateGroup management. | int | 01 |

<br>


Entity **flight**

| Name | Description | Type | Example |
| ---- | ------- | ------ | ----- |
| idFlight | ID of the Flight which is a combination of the Airline code and the route specification | varchar (8) | "BA2490" |
| idAirline | ID of the airline. | int | 01 |
| idArrival | ID of a country that reference to the Arrival of the determined flight. | int | 01 |


<br>

Relation **works**

| Name | Description | Type | Example |
| ---- | ------- | ------ | ----- |
| idWorks | ID that shows the relation between the Airlines that function at a specific facility | int | 01 |
| idFacility | ID that identifies a specific facility where N employees work under the GateGroup management. | int | 01 |
| idAirline | ID of the airline. | int | 01 |


</p>


<hr>





