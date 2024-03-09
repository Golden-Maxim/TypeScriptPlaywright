import {expect, test} from "@playwright/test";
import {User} from "../models/UserModel";


interface User2 {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

test.describe.parallel("Api testing", () => {

    const BASE_URL = 'https://reqres.in';
    test("Get request", async ({request}) => {
        const response = await request.get(`${BASE_URL}/api/users/2`);
        const responseJson = await response.json()
        //  const responseData = await responseJson.data;
        //Parse object into class
        const userModel = new User(responseJson.data);
        console.log("userModel ==");
        console.log(userModel);
        expect(response.status()).toBe(200);
        expect(userModel.first_name).toBe('Janet');
        expect(userModel.last_name).toBe('Weaver');
        expect(userModel.id).toBe(2);

    })

    let userId: number;
    test("Create request,  Create user", async ({request}) => {
        const myUser: object = {
            "name": "Maksym",
            "job": "AQA engineer"
        }
        const response = await request.post(`${BASE_URL}/api/users`, myUser);
        const responseBody = await response.json();
        expect(response.status()).toBe(201);
        expect(responseBody).toHaveProperty('id');
        expect(responseBody).toHaveProperty('createdAt');
        userId = responseBody.id;
    })


    test("Put request, Update User", async ({request}) => {
        const updatedUser: object = {
            "name": "Maksym",
            "job": "Senior AQA engineer"
        }

        const response = await request.put(`${BASE_URL}/api/users/${userId}`,);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('updatedAt');

    })


    test("Delete request, Delete User", async ({request}) => {
        const response = await request.delete(`${BASE_URL}/api/users/${userId}`);
        expect(response.status()).toBe(204);
    })


    test("Get request , Get lists of Users", async ({request}) => {
        const response = await request.get(`${BASE_URL}/api/users?page=2`);
        const responseBody = await response.json();
        expect(response.status()).toBe(200);
        const receivedUsers = responseBody.data.map((users: User) => new User(users));
        console.log(receivedUsers);
    })
})