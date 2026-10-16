import { assert } from "chai";
import { placemarkService } from "./placemark-service.js";
import { assertSubset } from "../test-utils.js";
import { testUsers } from "../fixtures.js";

suite("User API tests", () => {
  let savedUsers = [];
  setup(async () => {
    await placemarkService.deleteAllUsers();
    savedUsers = [];
    for (let i = 1; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const savedUser = await placemarkService.createUser({ ...testUsers[i] });
      savedUsers.push(savedUser);
    }
  });

  test("create a user", async () => {
    const newUser = await placemarkService.createUser({ ...testUsers[0] });
    assertSubset(testUsers[0], newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all users", async () => {
    let returnedUsers = await placemarkService.getAllUsers();
    assert.equal(returnedUsers.length, testUsers.length - 1);
    await placemarkService.deleteAllUsers();
    returnedUsers = await placemarkService.getAllUsers();
    assert.equal(returnedUsers.length, 0);
  });

  test("get a user - success", async () => {
    const returnedUser = await placemarkService.getUser(savedUsers[0]._id);
    assertSubset(testUsers[1], returnedUser);
  });
});