create table users_test_3
(
    id         bigserial primary key,
    username   varchar(100) not null,
    email      varchar(255),
    created_at timestamptz default now()
);