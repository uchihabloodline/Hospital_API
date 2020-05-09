//Env variable set to test when in UT phase
process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const Doctor = require('../model/doctor');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

//human readable description and function in other block
describe('Doctors', () => {
 /*
  * Test the /POST route for doctors registration
  */
  describe('/POST register doctor', () => {

    let username = "Shivam" + Date.now();
	  it('Should not register a doctor without username and password', (done) => {
	  	let doctor_info = {
	  		username: username
	  	}
			chai.request(server)
        .post('/api/v1/doctors/register')
		    .send(doctor_info)
		    .end((err, res) => {
			  	res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('message').eql('Internal Server Error');
		      done();
		    });
    });
    
    it('should register user with unique username and password ', (done) => {
	  	let doctor_info = {
        username: username,
        password: "shivam123"
	  	}
			chai.request(server)
      .post('/api/v1/doctors/register')
      .send(doctor_info)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('message').eql('Registration successful');
		      done();
		    });
	  });

    it('should not register a doctor if username already exists', (done) => {
	  	let doctor = {
        username: username,
        password: "shivam123"
	  	}
			chai.request(server)
      .post('/api/v1/doctors/register')
      .send(doctor)
		    .end((err, res) => {
			  	res.should.have.status(400);
			  	res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('message').eql('User already exist');
		      done();
		    });
    });
    
  });

   //Test case for doctor login
  describe('/POST register doctor', () => {
    it('it should not login if username field is missing', (done) => {
      let doctor = {
        password: "pass"
      }
      chai.request(server)
        .post('/api/v1/doctors/login')
        .send(doctor)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('message').eql('Invalid username or passowrd');
          done();
        });
    });
    it('it should not login if password field is missing', (done) => {
      let doctor = {
        username: "arunsridher"
      }
      chai.request(server)
        .post('/api/v1/doctors/login')
        .send(doctor)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('message').eql('Invalid username or passowrd');
          done();
        });
    });
    it('it should not login if username and password fields dont match', (done) => {
      let doctor = {
        username: "arunsridher",
        password: "password"
      }
      chai.request(server)
        .post('/api/v1/doctors/login')
        .send(doctor)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('message').eql('Invalid username or passowrd');
          done();
        });
    });
    it('it should login if username and password fields match and return a token', (done) => {
      let doctor = {
        username: "arunsridher",
        password: "test"
      }
      chai.request(server)
        .post('/api/v1/doctors/login')
        .send(doctor)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('message').eql('Login successful');
          res.body.should.have.property('token');
          done();
        });
    });
  });
});