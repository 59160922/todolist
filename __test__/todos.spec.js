const expect = require('chai').expect
const supertest = require('supertest')
const request = supertest('http://localhost:3000')

describe('Todos API',()=>{
   
    describe('GET /todos',()=>{
      it('should return list of todos',(done)=>{
        request.get('/todolist')
        .expect(200)
        .end((req,res)=>{
             let todos = res.body
             expect(todos).to.be.an('array')
             let todo = todos[0]
             expect(todo).to.have.a.property('msg')
             expect(todo).to.have.a.property('completed')
            done()
            })

        })

        it('should return list of todos Uncomplete',(done)=>{
            request.get('/todolistActive')
            .expect(200)
            .end((req,res)=>{
                 let todos = res.body
                 expect(todos).to.be.an('array')

                 //expect(todos).completed.should.be.equal(true)
                 let todo = todos[0]
                 expect(todo).to.have.a.property('msg')
                 expect(todo).to.have.a.property('completed')
                expect(todo.completed).to.be.false
                done()
                })
    
            })
            it('should return list of todos Uncomplete',(done)=>{
                request.get('/todolistCompeleted')
                .expect(200)
                .end((req,res)=>{
                     let todos = res.body
                     expect(todos).to.be.an('array')
    
                     //expect(todos).completed.should.be.equal(true)
                     let todo = todos[0]
                     expect(todo).to.have.a.property('msg')
                     expect(todo).to.have.a.property('completed')
                    expect(todo.completed).to.be.true
                    done()
                    })
        
                })
    })
    describe('DELETE /todolist/:id',()=>{

        let totalTodos =0
        beforeAll((done)=>{
            request.get('/todolist')
            .end((err,res)=>{
                let todos =res.body
                totalTodos = todos.length
                done()
            })
        })
        it('should remove todo successfully',(done)=>{
                request.delete('/todolist/1')
                .expect(204)
                .end((err,res)=>{
                    request.get('/todolist')
                    .end((err,res)=>{
                    let remaining = res.body.length
                    expect(remaining).to.below(totalTodos)
                    done()
                    })
                })
        })
    })
    describe('POST /todolist/:id',()=>{

        let totalTodos =0
        beforeAll((done)=>{
            request.get('/todolist')
            .end((err,res)=>{
                let todos =res.body
                totalTodos = todos.length
                done()
            })
        })
        it('should add todo successfully',(done)=>{
                request.post('/todolist')
                .send({msg:"Luffy"})
                .set('Appect','application/json')
                .expect(201)
                .end((err,res)=>{
                    request.get('/todolist')
                    .end((err,res)=>{
                    let remaining = res.body.length
                    expect(remaining).to.above(totalTodos)
                    done()
                    })
                })
        })
    })
})