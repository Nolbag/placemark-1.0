import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { db } from "../../src/models/db.js";
import { testUsers } from "../fixtures.js";

suite("User Model tests", () => {
  let savedUsers = [];
  db.init("mongo");
  setup(async () => {
    await db.userStore.deleteAll();
    savedUsers = [];
        for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const savedUser = await db.userStore.addUser({ ...testUsers[i] });
      savedUsers.push(savedUser);
    }
  });

  test("create a user", async () => {
    const newUser = await db.userStore.addUser(testUsers[0]);
    assertSubset(testUsers[0], newUser);
  });

  test("delete all userApi", async () => {
    let returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await db.userStore.deleteAll();
    returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, 0);
  });

  test("get a user - success", async () => {
    const user = savedUsers[0];
    const returnedUser1 = await db.userStore.getUserById(user._id);
    assert.deepEqual(user, returnedUser1);
    const returnedUser2 = await db.userStore.getUserByEmail(user.email);
    assert.deepEqual(user, returnedUser2);
  });

  test("delete One User - success", async () => {
    const deletedId = savedUsers[0]._id;
    await db.userStore.deleteUserById(deletedId);
    const returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, testUsers.length - 1);
    const deletedUser = await db.userStore.getUserById(deletedId);
    assert.isNull(deletedUser);
  });

  test("get a user - failures", async () => {
    const noUserWithId = await db.userStore.getUserById("123");
    assert.isNull(noUserWithId);
    const noUserWithEmail = await db.userStore.getUserByEmail("no@one.com");
    assert.isNull(noUserWithEmail);
  });

  test("get a user - bad params", async () => {
    let nullUser = await db.userStore.getUserByEmail("");
    assert.isNull(nullUser);
    nullUser = await db.userStore.getUserById("");
    assert.isNull(nullUser);
    nullUser = await db.userStore.getUserById();
    assert.isNull(nullUser);
  });

  test("delete One User - fail", async () => {
    await db.userStore.deleteUserById("bad-id");
    const allUsers = await db.userStore.getAllUsers();
    assert.equal(testUsers.length, allUsers.length);
  });
});