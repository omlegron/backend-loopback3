'use strict';

const app = require('../server/server');
const request = require('supertest');
const Team = app.models.Team;
const Members = app.models.Members;
const chai = require('chai');
const expect = chai.expect;

describe('Team  API', () => {
  beforeEach((done) => {
    Team.destroyAll({}, () => {
      done();
    });
  });

  beforeEach((done) => {
    Members.destroyAll({}, () => {
      done();
    });
  });

  it('should create a new teams', (done) => {
    const teamData = {
      name: 'Team 1',
      description: 'Description Team 1',
    };

    request(app)
      .post('/api/teams')
      .send(teamData)
      .expect(200)
      .expect((res) => {
        expect(res.body).to.have.property('id');
        expect(res.body.name).to.equal(teamData.name);
        expect(res.body.description).to.equal(teamData.description);
      })
      .end(done);
  });
});
