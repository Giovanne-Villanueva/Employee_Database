INSERT INTO department (department_name)
VALUES ("English"),
       ("Math"),
       ("Science"),
       ("Art"),
       ("Buissness");

INSERT INTO em_role (title, salary, department_id)
VALUES ("Journilist", 50000, 1),
       ("Algebra Instructor", 49000, 2),
       ("Head Journilist", 65000, 1),
       ("Chemist Drug Maker", 75000, 3),
       ("Film Director", 65000, 4),
       ("Lawyer", 80000, 5),
       ("Book Writer", 60000, 1),
       ("Mechanical Engineer", 70000, 3);


INSERT INTO employee ( first_name, last_name, role_id, manager_id)
VALUES ("Vent", "Sandoval", 1, 3),
       ("Gabby", "Norman", 2, NULL),
       ("Dextar", "Estrada", 3, NULL),
       ("Pablo", "Le", 4, NULL),
       ("Gerorge", "Vargas", 5, NULL),
       ("Sam", "Byrne", 6, NULL),
       ("Herald", "Hicks", 7, NULL),
       ("Jak", "Steele", 8, NULL);      
