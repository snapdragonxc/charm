# charm
### Description
**charm** is a responsive, Ecommerce website template built using the following technologies:
- ReactJS
- ReduxJS
- MongoDB/Mongoose
- ExpressJS
- Multer (image handling)
- PassportJS (authentication)
- Paypal

The template is currently in use with 'Charm Accessories'.

### Design
The website is designed to be used by small businesses. The Paypal interface ensures that no payment data is managed by the 
website. Furthermore, no customer details are stored on-line. 

A content management dashboard is provided for the uploading, editing and
removal of stock. The dashboard also allows for the editing and management of item categories and for the selection of the 
display items on the front page.

The template is responsive/adaptive and has been tested on an iPhone 5 and Samsung mobile phone.

### Styling
The styling was based on the [www.wix.com](https://www.wix.com) watch template:

[https://www.wix.com/demone2/watch-shop](https://www.wix.com/demone2/watch-shop)

The responsive grid was based on that described by Jonathan Fielding in his book 'Beginning Responsive Design with HTML5 and CSS3', which can be bought on Amazon:

[https://www.amazon.com/Beginning-Responsive-Design-HTML5-CSS3](https://www.amazon.com/Beginning-Responsive-Design-HTML5-CSS3/dp/1430266945)

### Installation
The website can be installed on a cloud service, such as Amazon AWS, or locally on a PC. It has been tested on an Amazon, 
AWS EC2 Ubuntu instance. 

To host on an EC2 instance use SSH to install an Nginx server, NodeJS, MongoDB, Certbot and a process manager such as 
[PM2](http://pm2.keymetrics.io/). Then clone a copy of the website and run: 

```
npm install
```
An example installation 'Setting up MERN Stack on AWS EC2', by Keith Weaver, is given in detail at medium at:

[https://medium.com/@Keithweaver_/setting-up-mern-stack-on-aws-ec2-6dc599be4737](https://medium.com/@Keithweaver_/setting-up-mern-stack-on-aws-ec2-6dc599be4737).

Note that this example installation uses a linux distribution version of MongoDB and does not include the official MongoDB 
installation, which is described at:

[https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

Also note that MongoDB must be restarted in order for the authentication to take effect. 


To install locally ensire that you have first installed NodeJS and MongoDB. Then use npm: 

```
npm install
```
### Running Locally
To run the website locally: 
```
npm start
```
and navigate to 'http:\localhost:8080' in your web browser
