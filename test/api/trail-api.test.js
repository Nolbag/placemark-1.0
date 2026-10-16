import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import { testTrail, testTrails, testUsers } from "../fixtures.js";

suite("Trail API tests", () => {
  let testUser = null;
  let savedTrails = [];

  setup(async () => {
    await placemarkService.deleteAllTrails();
    await placemarkService.deleteAllUsers();
    testUser = await placemarkService.createUser({ ...testUsers[0] });
    savedTrails = [];
    for (let i = 0; i < testTrails.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      savedTrails[i] = await placemarkService.createTrail({
        ...testTrails[i],
        userid: testUser._id,
      });
    }
  });

  test("create trail", async () => {
    const returnedTrail = await placemarkService.createTrail({
      ...testTrail,
      userid: testUser._id,
    });
    assertSubset(testTrail, returnedTrail);
  });

  test("get all trails", async () => {
    const trails = await placemarkService.getAllTrails();

    assert.equal(trails.length, testTrails.length);
  });

  test("get one trail", async () => {
    const trail = await placemarkService.getTrail(savedTrails[0]._id);

    assertSubset(testTrails[0], trail);
  });

  test("update a trail", async () => {
    const updatedTrail = {
      ...testTrails[0],
      name: "Updated Woodland Walk",
      userid: testUser._id,
    };

    const trail = await placemarkService.updateTrail(
      savedTrails[0]._id,
      updatedTrail,
    );

    assert.equal(trail.name, "Updated Woodland Walk");
  });

  test("delete one trail", async () => {
    const response = await placemarkService.deleteTrail(savedTrails[0]._id);

    assert.equal(response.status, 204);

    const trails = await placemarkService.getAllTrails();
    assert.equal(trails.length, testTrails.length - 1);
  });

  test("delete all trails", async () => {
    await placemarkService.deleteAllTrails();

    const trails = await placemarkService.getAllTrails();
    assert.equal(trails.length, 0);
  });
});

