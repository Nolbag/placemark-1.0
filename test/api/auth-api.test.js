import { assert } from "chai";
import { placemarkService } from "./placemark-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie, maggieCredentials } from "../fixtures.js";

suite("Authentication API tests", () => {

  setup(async () => {
    placemarkService.clearAuth();

    await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggieCredentials);
    await placemarkService.deleteAllUsers();

    placemarkService.clearAuth();
  });

  test("authenticate", async () => {
    const returnedUser = await placemarkService.createUser(maggie);
    const response = await placemarkService.authenticate(maggieCredentials);

    assert.isTrue(response.success);
    assert.isDefined(response.token);
    assert.isDefined(returnedUser._id);
  });

  test("verify token", async () => {
    const returnedUser = await placemarkService.createUser(maggie);
    const response = await placemarkService.authenticate(maggieCredentials);

    const userInfo = decodeToken(response.token);

    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });
});