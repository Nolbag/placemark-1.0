import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testTrail, testTrails, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Trail Model tests", () => {
  
  let testUser = null;
  let savedTrails = [];
  
  setup(async () => {
    db.init("mongo");
    await db.trailStore.deleteAllTrails();
    await db.userStore.deleteAll();
    testUser = await db.userStore.addUser(testUsers[0]);
    savedTrails = [];
    for (let i = 0; i < testTrails.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      savedTrails[i] = await db.trailStore.addTrail({
        ...testTrails[i],
        userid: testUser._id,
      });
    }
  });
  
  test("create single trail", async () => {
    const trailList = await db.trailStore.addTrail(testTrail);
    assert.isNotNull(trailList._id);
    assertSubset (testTrail, trailList);
  });
  
  test("get multiple trails", async () => {
    const trails = await db.trailStore.getTrailsByUserId(testUser._id);
    assert.equal(trails.length, testTrails.length)
  });
  
  test("delete all trails", async () => {
    const trails = await db.trailStore.getTrailsByUserId(testUser._id);
    assert.equal(testTrails.length, trails.length);
    await db.trailStore.deleteAllTrails();
    const newTrails = await db.trailStore.getTrailsByUserId(testUser._id);
    assert.equal(0, newTrails.length);
  });
  
  test("get a trail - success", async () => {
    const trail = await db.trailStore.addTrail({
      ...testTrail,
      userid: testUser._id
    });
    const newTrail = await db.trailStore.getTrailById(trail._id);
    assertSubset (testTrail, newTrail);
  });
  
  test("delete One Trail - success", async () => {
    const deletedId = savedTrails[0]._id;
    await db.trailStore.deleteTrail(deletedId);
    const trails = await db.trailStore.getTrailsByUserId(testUser._id);
    assert.equal(trails.length, testTrails.length - 1);
    assert.isNull(await db.trailStore.getTrailById(deletedId));
  });
  
  test("get a trail - bad params", async () => {
    assert.isNull(await db.trailStore.getTrailById(""));
    assert.isNull(await db.trailStore.getTrailById());
  });
  
  test("delete one trail - fail", async () => {
    await db.trailStore.deleteTrail("bad-id");
    const trails = await db.trailStore.getTrailsByUserId(testUser._id);
    assert.equal(trails.length, testTrails.length);
  });
});
