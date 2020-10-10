
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Jay', 'Suh', 1, NULL),
    ('Francisco', 'Lazcon', 2, 1),
    ('Simon', 'Alfafara', 3, 2),
    ('Jeneva', 'Munoz', 3, 2),
    ('Daniel', 'Collins', 3, 2),
    ('Minnette', 'Tiamsic', 4, 3),
    ('Duong', 'Duong', 4, 3),
    ('Cheryl', 'Anicete', 5, 2),
    ('Rheine', 'Nguyen', 6, 5),
    ('Mae', 'Ramirez', 6, 5),
    ('Edmund', 'Aryee', 10, 2),
    ('Kostia', 'Tepliuk', 11, 4),
    ('Thomas', 'Chan', 12, 4),
    ('Patrick', 'Wong', 8, 2),
    ('Danny', 'Johannes', 9, 6),
    ('Ron', 'Chen', 13, 2),
    ('Dalilah', 'Orozco', 14, 7),
    ('Saeid', 'Dalma', 15, 7)

-- managers to choose from --
INSERT INTO managers (manager_id, name)
VALUES
    (1, 'Jay Suh'),
    (2, 'Francisco Lazcon'),
    (3, 'Jeneva Munoz'),
    (4, 'Edmund Aryee'),
    (5, 'Cheryl Anicete'),
    (6, 'Patrick Wong'),
    (7, 'Ron Chen')

-- roles to choose from --
INSERT INTO roles (title, salary, department_id)
VALUES 
    ('CEO', '120,000', 1),
    ('General Manager', '90,000', 1),
    ('Sales Manager', '60,000', 1),
    ('Project Coordinator', '32,000', 1),
    ('Documentation Manager', '45,000', 2),
    ('Technical Writers', '30,000', 2),
    ('Receptionist', '24,000', 2),
    ('IT Manager', '70,000', 3),
    ('IT Associate', '62,000', 3),
    ('Software Manager', '85,000', 5),
    ('Software Engineer', '80,000', 5),
    ('Software Engineer Intern', '40,000', 5),
    ('Account Manager', '70,000', 4),
    ('Accountant', '63,000', 4),
    ('Accounting Assistant', '40,000', 4)

-- department values to choose from --
INSERT INTO departments (department_id, name)
VALUES
    (1, 'Sales'),
    (2, 'Admin'),
    (3, 'IT'),
    (4, 'Finance'),
    (5, 'Engineering')

