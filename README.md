# mimickinggoogleshets

------------------------------
first enter the value in the A1=5
and the enter second value in A2=5
then write formula in A3 or in formulabar(select an emty cell) like =SUM(A1,A2) then press Enter

1. Installation and Setup
------------------------
-> Clone the repository using git clone https://github.com/HarshSharma1107/mimickinggoogleshets
-> Install dependencies using npm install/ npm i
-> Start the application using npm start

2. Key Features Implemented
•	and Drop Interface Formatting cells Spreadsheet Interface with drag functionality, cell dependencies, and basic cell formatting
•	Mathematical Functions (SUM, AVERAGE, MAX, MIN, COUNT)
•	Data Quality Functions (TRIM, UPPER, LOWER, REMOVE_DUPLICATES, FIND_AND_REPLACE)

3.Data Entry and Validation
4.Testing functionality
5.Bonus Features Implemented

If Function and filters

Technologies Used
React+vite, Typescript, HTML,CSS.

Supported Formulas
SUM(range)
=SUM(A1,A3)

AVERAGE(range)
=AVERAGE(A1,A3)
MIN(range)
=MIN(A1,A3)

UPPER(cell)
Converts text in a cell to uppercase.
UPPER(A1)

LOWER(cell)
Converts text in a cell to lowercase.
LOWER(A1)

TRIM(cell)
Removes extra spaces from text in a cell.

TRIM(A1)

IF Formula:

Syntax: =IF(A1>50, "Yes", "No")
Checks a condition (e.g., A1>50) and returns a value (Yes or No).
FILTER Formula:

Syntax: =FILTER(A1:A10, A1:A10>50)
Filters the range A1:A10 to return values meeting the condition (e.g., greater than 50).

