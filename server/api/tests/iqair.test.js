import request from 'supertest'
import router from '../routes/iqair.routes.js'
//import request from 'request'

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

    describe("when the latittude or longitude are not numbers", ()=>{

    })

    describe("when the latittude & longitude are missing", ()=>{

    })
})