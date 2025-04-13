import fetch from "node-fetch";
import { expect } from "chai";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import schema_createuser from "../schema/regresSchema.js";

describe("API Test Suite", function () {

    // Test for GET Request
    it("Fetch Single User", async function () {
        const response = await fetch('https://reqres.in/api/users/2');
        const data = await response.json();

        // Validate HTTP status
        expect(response.status, "Unexpected HTTP Status").to.equal(200);

        // Validate user details
        expect(data.data.id, "Invalid User ID").to.equal(2);
        expect(data.data.email, "Email is missing").to.be.a('string');
    });

    // Test for POST Request
    it("Create New User", async function () {
        const newUser = {
            name: "John Doe",
            job: "Developer"
        };

        const response = await fetch('https://reqres.in/api/users', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
        });

        expect(response.status, "Failed to create user").to.equal(201);

        // Validate JSON schema
        const ajv = new Ajv();
        addFormats(ajv); // Add support for "date-time" format
        const data = await response.json();
        const validate = ajv.compile(schema_createuser);
        const isValid = validate(data);

        expect(isValid, "Schema validation failed").to.be.true;

        // Validate user details
        expect(data.name, "Name did not save correctly").to.equal(newUser.name);
        expect(data.job, "Job did not save correctly").to.equal(newUser.job);
    });
});
