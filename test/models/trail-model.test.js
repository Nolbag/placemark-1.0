import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testTrail, testTrails, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Trail Model tests", () => {

let testUser = null;

setup(async () => {
  db.init("mongo");
  await db.trailStore.deleteAllTrails();
  await db.userStore.deleteAll();
  testUser = await db.userStore.addUser(testUsers[0]);
  for (let i = 0; i < testTrails.length; i += 1) {
  // eslint-disable-next-line no-await-in-loop
  await db.trailStore.addTrail({
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

  test("delete all tracks", async () => {
    const tracks = await db.trackStore.getAllTracks();
    assert.equal(testTracks.length, tracks.length);
    await db.trackStore.deleteAllTracks();
    const newTracks = await db.trackStore.getAllTracks();
    assert.equal(0, newTracks.length);
  });

  test("get a track - success", async () => {
    const mozartList = await db.playlistStore.addPlaylist(mozart);
    const track = await db.trackStore.addTrack(mozartList._id, concerto)
    const newTrack = await db.trackStore.getTrackById(track._id);
    assertSubset (concerto, newTrack);
  });

  test("delete One Track - success", async () => {
    await db.trackStore.deleteTrack(testTracks[0]._id);
    const tracks = await db.trackStore.getAllTracks();
    assert.equal(tracks.length, testPlaylists.length - 1);
    const deletedTrack = await db.trackStore.getTrackById(testTracks[0]._id);
    assert.isNull(deletedTrack);
  });

  test("get a track - bad params", async () => {
    assert.isNull(await db.trackStore.getTrackById(""));
    assert.isNull(await db.trackStore.getTrackById());
  });

  test("delete one track - fail", async () => {
    await db.trackStore.deleteTrack("bad-id");
    const tracks = await db.trackStore.getAllTracks();
    assert.equal(tracks.length, testPlaylists.length);
  });
});
