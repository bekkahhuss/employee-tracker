INSERT INTO department
    (id, name)
VALUES
('1', 'shoes'),
('2', 'makeup'),
('3', 'clothing');

INSERT INTO role
    (id, salary, title, department_id)
VALUES
('11', '40000', 'shoe sales manager', '1'),
('12', '25000', 'shoe sales assistant', '1'),
('13', '40000', 'makeup sales manager', '2'),
('14', '25000', 'makeup sales assistant', '2'),
('15', '40000', 'clothing sales manager', '3'),
('16', '25000', 'clothing sales assistant', '3');

INSERT INTO employee
    (id, first_name, last_name, role_id, department_id, manager_id)
VALUES
('111', 'Sam' , 'Smith', '11', '1', '0'),
('222', 'Bob', 'Johnson', '12', '1', '111'),
('333', 'Dante', 'Jones', '13', '2', '0'),
('444', 'Shandra', 'Matthews', '14', '2', '333'),
('555', 'Maya', 'Anderson', '15', '3', '0'),
('666', 'Steve', 'Michaels', '16', '3', '555');
