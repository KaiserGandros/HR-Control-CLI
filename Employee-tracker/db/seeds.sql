INSERT INTO department (name)
VALUES
('Human Resources'),
('Marketing'),
('IT'),
('Operations');

INSERT INTO role (title, salary, departmentID)
VALUES
('Project Manager', 70000, 4),
('Operations Manager', 100000, 4),
('Front End Developer', 60000, 3),
('Full Stack Developer', 80000, 3),
('HR manager', 65000, 1),
('HR assistant', 42000, 1),
('Sales Representative', 58000, 2),
('Marketing Director', 90000, 2);

INSERT INTO employee (firstName, lastName, roleID, managerID)
VALUES
('Chris', 'Tuffelmire', 4, 1),
('Mark', 'Gardner', 4, 1),
('Noah', 'King', 3, NULL),
('Ali', 'Illiano', 3, NULL),
('Nate', 'Birchfield', 2, NULL),
('Julius', 'Evola', 2, NULL),
('Erwin', 'Rommel', 1, NULL),
('Cole', 'Wright', 1, NULL);