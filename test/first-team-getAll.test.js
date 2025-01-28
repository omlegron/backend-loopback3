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

  it('should get all teams', (done) => {
    const teamData1 = {
      name: 'Team 1',
      description: 'Description Team 1',
    };

    const teamData2 = {
      name: 'Team 2',
      description: 'Description Team 2',
    };

    Team.create(teamData1, () => {
      Team.create(teamData2, () => {
        request(app)
          .get('/api/teams')
          .expect(200)
          .expect((res) => {
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.equal(2);
          })
          .end(done);
      });
    });
  });
});
