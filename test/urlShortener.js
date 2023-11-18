const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js'); 
const expect = chai.expect;

chai.use(chaiHttp);

describe('URL Shortener', () => {
  it('should create a shortened URL', (done) => {
    chai.request(app)
      .post('/shorten')
      .send({ longURL: 'https://www.example.com' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('shortURL');
        done();
      });
  });

  it('should redirect to the original URL', (done) => {
    chai.request(app)
      .get('/your-short-code') // Replace with a valid short code
      .end((err, res) => {
        expect(res).to.redirect;
        done();
      });
  });
});
