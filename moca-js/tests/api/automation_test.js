import fetch from "node-fetch"
import { expect } from "chai"
import Ajv from "ajv";
import schema_createnewuser from "../schema/regresSchema.js";

describe("API Test Suite coba", function(){

    it("Get single user", async function(){
        // tembak url reqres
        const hasil = await fetch('https://reqres.in/api/users/2')

        // validasi http status nya harus 200
        expect(hasil.status, "ada yang salah").to.equal(200)
    });

    it("Create new User", async function() {
        const newPost = {
            name: "Morpheus",
            job: "leader"
        };

        const hasilpost = await fetch('https://reqres.in/api/users', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPost)
        });

        expect(hasilpost.status, "belum post").to.equal(201)

        // validate JSON schema
        const ajv = new Ajv();
        const data = await hasilpost.json();
        const cekcek = ajv.compile(schema_createnewuser);
        const hasil_schema = cekcek(data);

        expect(hasil_schema,"schema not valid").to.be.true;

    });

});
