INSERT INTO department
    (id, name)
VALUES
('1', 'shoes'),
('2', 'makeup'),
('3', 'clothing');

INSERT INTO role
    (id, salary, title, department_id)
VALUES
('11', '25000', 'sales assistant', '1'),
('12', '40000', 'sales manager', '1'),
('13', '25000', 'sales assistant', '2'),
('14', '40000', 'sales manager', '2'),
('15', '25000', 'sales assistant', '3'),
('16', '40000', 'sales manager', '3');

INSERT INTO employee
    (id, first_name, last_name, role_id, department_id, manager_id)
VALUES
('111', 'Sam' , 'Smith', '11', '1', '222'),
('222', 'Bob', 'Johnson', '12', '1', '0'),
('333', 'Dante', 'Jones', '13', '2', '444'),
('444', 'Shandra', 'Matthews', '14', '2', '0'),
('555', 'Maya', 'Anderson', '15', '3', '666'),
('666', 'Steve', 'Michaels', '16', '3', '0');
