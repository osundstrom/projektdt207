# Projekt - DT207G - NoNonsenseBurgers
Under detta projekt skapas det autensiering för att logga in, det skapas flera collections i en databas hos MongoDB, och dessa hämtas och visas/redigeras på olika sätt beroende på vart de ska visas på hemsidna.  

## Installation
Uppgiften använder sig av MongoDB som databas, den är uppladdad via Render. Då det används Render både för funktioner vid inlogg och hämta innehåll till den (hemliga sidan) så kan det ta en stund då Render går ner i viloläge då den ej används. 

I databasen (projektAdmin) finns det 4 collections som ser ut enligt nedan.
 
### users

| _id   | username    | password      | account_created   | __v  | 
| ---- | -------------- | ---------- | ----------- | -------- |
| 1  | användarnamn  | Lösenord  |  2024-02-01 T 15:05:40     | 0 |

### meny

| _id   | name    | description   | price    | type   | __v  | 
| ---- | -------------- | ---------- | ---------- | ----------- | -------- |
| 1  | dryck1/burger1  | En dryck/en burgare  | 199  | dryck/mat     | 0 |

### books

| _id   | email    | phone   | firstName    | lastName   | numberGuests  |  bookDate  |  __v  | 
| ---- | -------------- | ------------ | --------------- | ----------- | -------- | -------- | -------- |
| 1  | epost@epost.se  | 0771 000 000  | Oskar  | Sundström     | 5 | 2024-06-01 22:00 | 0 |

### reviews

| _id   | name    | rating   | message    | __v  | 
| ---- | -------------- | ---------- | ---------- | ----------- |
| 1  | Oskar Sundström  | 4  | Ett meddelande från kund   | 0 |



## Användning
 Hur man användet det:

| Metod   | Url ändelse    | Beskrivning   | 
| ---- | -------------- | ---------- | 
| GET   | /api/secret    | Hämtar datan efter man blivit inloggad  | 
| GET   | /api/meny    | Hämtar datan till menyn  | 
| GET   | /api/booking    | Hämtar datan till bokningar | 
| GET   | /api/review    | Hämtar datan till recensioner | 


| Metod   | Url ändelse    | Beskrivning   | 
| ---- | -------------- | ---------- | 
| DELETE   | /api/meny:id    | Raderar från meny | 
| DELETE   | /api/booking:id    | Raderar från bokningar | 

| Metod   | Url ändelse    | Beskrivning   | 
| ---- | -------------- | ---------- | 
| PUT   | /api/meny:id    | Ändrar nått i menyn| 

| Metod   | Url ändelse    | Beskrivning   | 
| ---- | -------------- | ---------- | 
| POST   | /api/meny    | Lägger till nytt till meny  | 
| POST   | /api/booking    | Lägger till en bokning| 
| POST   | /api/booking    | Lägger till en bokning| 
| POST   | /api/register    | Registrerar en ny användare  | 
| POST   | /api/login    | Loggar in med en befintlig användare | 
| POST   | /api/review    | Lägger till nytt till recensioner  | 





```json

En användare har strukturen enligt nedan med JSON format

{
  "_id": "1"
   "username": "användarnamn",
   "password": "Lösenord",
   "account_created": "2024-02-01 T 15:05:40",
    "__v": "0"
}

Ett item till menyn har strukturen enligt nedan med JSON format. 

{
  "_id": "1"
   "name": "dryck1/burger1",
   "price": "199",
   "description": "En dryck/en burgare",
   "type": "dryck/mat",
    "__v": "0"
}

En bokning har strukturen enligt nedan med JSON format.  

{
  "_id": "1"
   "epost": "epost@epost.se",
   "phone": "0771 000 000",
   "firstName": "Oskar",
   "lastName": "Sundström",
  "numberGuests": "5",
  "bookDate": "2024-06-01 22:00",
    "__v": "0"
}

En recension har strukturen enligt nedan med JSON format. 

{
  "_id": "1"
   "Name": "Oskar Sundström",
   "rating": "4",
   "description": "Ett meddelande från kund",
    "__v": "0"
}


```

