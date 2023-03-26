INSERT INTO department (id, dept_name)
VALUES (1, "Human Resources"),
       (2, "Sales"),
       (3, "Engineering"),
       (4, "Legal"),
       (5, "Finance"),
       (6, "Marketing"),
       (7, "Operations");

INSERT INTO role (title, salary, department_id)
VALUES ("Human Resources Manager", 100000, 1),
       ("Sales Manager", 100000, 2),
       ("Engineering Manager", 100000, 3),
       ("Legal Manager", 100000, 4),
       ("Finance Manager", 100000, 5),
       ("Marketing Manager", 100000, 6),
       ("Operations Manager", 100000, 7),
       ("Human Resources Representative", 50000, 1),
       ("Sales Representative", 50000, 2),
       ("Engineering Representative", 50000, 3),
       ("Legal Representative", 50000, 4),
       ("Finance Representative", 50000, 5),
       ("Marketing Representative", 50000, 6),
       ("Operations Representative", 50000, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith", 1, NULL),
       ("Jane", "Doe", 2, NULL),
       ("Bob", "Jones", 3, NULL),
       ("Sally", "Johnson", 4, NULL),
       ("Mike", "Brown", 5, NULL),
       ("Sarah", "Miller", 6, NULL),
       ("Bill", "Williams", 7, NULL),
       ("Mary", "Davis", 8, 1),
       ("John", "Wilson", 9, 2),
       ("Jane", "Moore", 10, 3),
       ("Bob", "Taylor", 11, 4),
       ("Sally", "Anderson", 12, 5),
       ("Mike", "Thomas", 13, 6);