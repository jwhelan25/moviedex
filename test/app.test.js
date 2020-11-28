const supertest = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe('GET /movie', () => {
  it('should return an array of movies', () => {
    return supertest(app)
      .get('/movie/bearer=secretstuff')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res =>{
          expect(res.body).to.be.an('array')
          expect(res.body).to.have.lengthOf.at.least(1);
      const movie = res.body[0];
      expect(movie).to.include.all.keys(
        'year', 'genre', 'duration', 'votes'       )
      })
  })
  it.skip('should be 400 if genre is incorrect', () => {
    return supertest(app)
      .get('/movie')
      .query({ sort: 'MISTAKE' })
      .expect(400, 'Sort must be one of title or rank');
  });
  it.skip('should sort by title', () => {
    return supertest(app)
      .get('/books')
      .query({ sort: 'title' })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        let sorted = true;

        let i = 0;
        // iterate once less than the length of the array
        // because we're comparing 2 items in the array at a time
        while (i < res.body.length - 1) {
          // compare book at `i` with next book at `i + 1`
          const bookAtI = res.body[i];
          const bookAtIPlus1 = res.body[i + 1];
          // if the next book is less than the book at i,
          if (bookAtIPlus1.title < bookAtI.title) {
            // the books were not sorted correctly
            sorted = false;
            break; // exit the loop
          }
          i++;
        }
        expect(sorted).to.be.true;
      });
  });
})