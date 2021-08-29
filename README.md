<h1>Phone book is an ExpressJS demo API for testing front ends</h1>

<h4>Pre requisites</h4>

- Execute table schema located in script.sql

<h4>Endpoints</h4>

- POST /contact
  - {name, gender, birthdate:'mm-dd-yyyy'}.
  - Will return {id: UUID, name, gender, birthdate:'mm-dd-yyyy'}.
- PATCH /contact/:id
  - Update contact with :id.
  - Will take partial field updates {name, gender, birthdate:'mm-dd-yyyy'}.
- DELETE /contact/:id
  - Deletes contact with :id
- GET /contact/:id
  - For querying specific Contact.
- GET /contact
  - Get all contacts.
- GET /form/gender
  - Will return supported form data for gender selectors.
  - POST /contact will base on this for validation.