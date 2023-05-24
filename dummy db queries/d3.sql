CREATE DATABASE InfoScrap;

USE InfoScrap;

CREATE TABLE events(
    eventId varchar(40),
    eventName varchar(500),
    staffName varchar(250),
    description varchar(5000),
    eventLink varchar(1000),
    duration varchar(50),
    PRIMARY KEY (eventId, eventName)
);

CREATE TABLE eServices(
    eServiceId varchar(40),
    serviceHeading varchar(100),
    paragraph varchar(500),
    PRIMARY KEY(eServiceId, serviceHeading)
);

CREATE TABLE media(
    mediaId varchar(40),
    mediaType varchar(6),
    topic varchar(50),
    link varchar(100),
    imageLink varchar(100),
    PRIMARY KEY(mediaId, mediaType, topic)
);

CREATE TABLE articles(
    articleId varchar(40),
    articleName varchar(50),
    description varchar(1000),
    link varchar(500),
    PRIMARY KEY(articleId, articleName)
);

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Sena@2003';

select * from articles;
delete  from articles;
