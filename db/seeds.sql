INSERT INTO department
    (id, name)
VALUES
('1', 'shoes'),
('2', 'makeup'),
('3', 'clothing');

INSERT INTO role
    (id, salary, title, department_id)
VALUES
('11', '25k', 'sales assistant', '1'),
('12', '40k', 'sales manager', '1'),
('13', '25k', 'sales assistant', '2'),
('14', '40k', 'sales manager', '2'),
('15', '25k', 'sales assistant', '3'),
('16', '40k', 'sales manager', '3');

INSERT INTO employee
    (1d, first_name, last_name, role_id, manager_id)
VALUES
('111', 'Sam' , 'Smith', '11', '222'),
('222', 'Bob', 'Johnson', '12', ''),
('333', 'Dante', 'Jones', '13', '444'),
('444', 'Shandra', 'Matthews', '14', ''),
('555', 'Maya', 'Anderson', '15', '666'),
('666', 'Steve', 'Michaels', '16', '');
