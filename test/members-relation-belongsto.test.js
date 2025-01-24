'use strict';

const app = require('../server/server');
const request = require('supertest');
const Team = app.models.Team;
const Members = app.models.Members;
const chai = require('chai');
const expect = chai.expect;

describe('Member  API', () => {
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

  it('should get a member by id with belongsTo team', (done) => {
    const teamData = {
      name: 'Team 1',
      description: 'Description Team 1',
    };

    const memberData = {
      name: 'Member 1',
      description: 'Description Member 1',
    };

    Team.create(teamData, (err, team) => {
      memberData.teamId = team.id;
      request(app)
        .post(`/api/teams/${team.id}/members`)
        .send(memberData)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.have.property('id');
          expect(res.body.name).to.equal(memberData.name);
          expect(res.body.description).to.equal(memberData.description);
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          // Get the member ID from the previous response
          const memberId = res.body.id;

          request(app)
            .get(`/api/members/${memberId}`)
            .query({filter: {include: ['team']}})
            .expect(200)
            .expect((res) => {
              console.log('res', res.body);
              expect(res.body).to.have.property('id');
              expect(res.body.name).to.equal(memberData.name);
              expect(res.body.description).to.equal(memberData.description);
              expect(res.body.team).to.be.an('object');
              expect(res.body.team.name).to.equal(teamData.name);
              expect(res.body.team.description).to.equal(teamData.description);
            })
            .end(done);
        });
    });
  });
});
