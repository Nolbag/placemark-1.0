import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import { maggie, maggieCredentials, testUsers } from "../fixtures.js";

suite("User API tests", () => {
  let savedUsers = [];

setup(async () => {
  placemarkService.clearAuth();

  await placemarkService.createUser(maggie);
  await placemarkService.authenticate(maggieCredentials);
  await placemarkService.deleteAllUsers();

  savedUsers = [];

  for (let i = 1; i < testUsers.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const savedUser = await placemarkService.createUser({
      ...testUsers[i],
    });
    savedUsers.push(savedUser);
  }

  await placemarkService.createUser(maggie);
  await placemarkService.authenticate(maggieCredentials);
});

  test("create a user", async () => {
    const newUser = await placemarkService.createUser(maggie);
    assertSubset(maggie, newUser);
  });

test("delete all users", async () => {
  let returnedUsers = await placemarkService.getAllUsers();
  assert.equal(returnedUsers.length, testUsers.length);

  await placemarkService.deleteAllUsers();

  await placemarkService.createUser(maggie);
  await placemarkService.authenticate(maggieCredentials);

  returnedUsers = await placemarkService.getAllUsers();
  assert.equal(returnedUsers.length, 1);
});

  test("get a user", async () => {
    const returnedUser = await placemarkService.getUser(savedUsers[0]._id);
    assertSubset(testUsers[1], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      await placemarkService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert.equal(error.response.data.message, "No User with this id");
    }
  });

  test("get a user - deleted user", async () => {
    await placemarkService.deleteAllUsers();

    await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggieCredentials);

    try {
      await placemarkService.getUser(savedUsers[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert.equal(error.response.data.message, "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});