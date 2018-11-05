process.env.NODE_ENV = 'test'

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let should = require('chai').should() 
let config = require('../config/config')
let expect = chai.expect



chai.use(chaiHttp)

describe('/GET products', () => {
  it('it should GET all the trending products', (done) => {
    chai.request(server)
            .get('/api/V1/products/trending')
            .end((err, res) => {
              res.should.have.status(200)
              res.body.should.be.a('array')
              expect(res.body).to.not.be.empty
              done()
            })
  })

  it('A product should have a name, a brand and and image url', (done) => {
    chai.request(server)
            .get('/api/V1/products/trending')
            .end((err, res) => {
              res.should.have.status(200)
              res.body[0].should.have.property('name')
              res.body[0]['name'].should.be.a('string')
              res.body[0].should.have.property('photo')
              res.body[0]['photo'].should.be.a('string')
              res.body[0].should.have.property('brand')
              res.body[0]['brand'].should.be.a('string') 
              res.body[0].should.have.property('brand') 
                             
              done()
            })
  })
})


