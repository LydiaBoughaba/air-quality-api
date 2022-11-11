import request from 'supertest'
import router from '../routes/iqair.routes.js'

describe("GET /iqair", () =>{
    describe("given latittude & longitude", ()=>{
        test("should respond with 200 status code", async() =>{
            const response = await request(router).get("/iqair").send({
                "latitude": "48.856613",
                "longitude": "2.352222"
            })
            expect(response.statusCode).toBe(200)
        })
        
    })

    describe("when the latittude and/or longitude are not numbers", ()=>{
        test("should respond with 400 status code", async() =>{
            const response = await request(router).get("/iqair").send({
                "latitude": "@",
                "longitude": "test"
            })
            expect(response.statusCode).toBe(400)
        })
    })

    describe("when the latittude & longitude are missing", ()=>{
        test("should respond with 400 status code", async() =>{
            const response = await request(router).get("/iqair").send()
            expect(response.statusCode).toBe(400)
        })
    })
})

describe("GET /iqair/paris-most-polluted", ()=>{
    describe("when there's data on db", ()=>{
        test("should respond with 200 status code", async() =>{
            const response = await request(router).get("/iqair/paris-most-polluted").send()
            expect(response.statusCode).toBe(200)
        })
    })
})