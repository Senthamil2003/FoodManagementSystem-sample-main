Insert ignore into stock.vendor (vendorName,category) values ('SENTHIL','VEGETABLES & FRUITS');

select count(item) from category;

use stock;

SELECT COALESCE(c.quantity, 0) as quantity,
  COALESCE(c.item, 'undefined') as item
FROM current c
WHERE c.item = 'Good';


SELECT COALESCE(c.quantity, 0) as quantity,
  COALESCE(c.item, 'undefined') as item
FROM (SELECT 'BANANA LEAF' as item) q
LEFT JOIN current c
ON c.item = q.item
LIMIT 1;

use foodmanagement;

select * from closingstock;

create table closingstock(id int AUTO_INCREMENT Primary Key, item varchar(255) NOT NULL, category varchar(255) NOT NULL, quantity double NOT NULL, date date NOT NULL);

insert into closingstock (item, category, quantity,date)
select item,category,quantity,'2023-01-30' from current;

select * from current;

select * from dispatch where item='MARATI MOGGU' and date>='2023-01-09' and date<='2023-02-09';

select * from dispatch1;
select * from category;
CREATE TABLE `dispatch1` (
  `id` int(11) NOT NULL,
  `item` varchar(200) NOT NULL,
  `RMK` double NOT NULL,
  `RMD` double NOT NULL,
  `RMKCET` double NOT NULL,
  `RMKSCHOOL` double NOT NULL,
  `date` date NOT NULL,
  `category` varchar(255) DEFAULT NULL
);
ALTER TABLE dispatch1 ADD PRIMARY KEY (id);
ALTER TABLE `dispatch1` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

use finalstock;

delete from current where item is null or trim(item) ='';


