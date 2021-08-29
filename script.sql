create table if not exists contact
(
    id        uuid    not null
        constraint contact_pk
            primary key,
    name      varchar not null,
    gender    varchar not null,
    birthdate date    not null
);

comment on table contact is 'Main table for the test API';

comment on column contact.id is 'For testing UUID queries';

comment on column contact.name is 'For testing against Strings';

comment on column contact.gender is 'For testing known string enums ';

comment on column contact.birthdate is 'For testing queries against date types';

create table if not exists contact_number
(
    id         uuid    not null
        constraint contact_number_pk
            primary key,
    contact_id uuid    not null
        constraint contact_number_contact_id_fk
            references contact,
    number     varchar not null
);

comment on table contact_number is 'Support table for testing DB';

comment on column contact_number.id is 'UUID identifier test';

comment on column contact_number.contact_id is 'contact foreign key for associated query test.';

comment on column contact_number.number is 'Test data value';


