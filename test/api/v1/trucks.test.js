const { expect } = require('chai');
const request = require('supertest');

require('../test_helper');


describe('API V1', () => {
  describe('Trucks', () =>{
    describe('GET /trucks', () => {
      it('returns the list of current connected trucks', (done) => {

        request(app)
          .get('/v1/trucks')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((error, response) => {
            if (error) return done(error);

            expect(response.body).to.deep.equal([]);
            done();
          });
      });
    });
  });
});
