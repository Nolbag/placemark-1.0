import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testTrail, testUsers, maggie } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Trail Model tests", () => {

setup(async () => {
  db.init("mongo");
  await db.trailStore.deleteAllTrails();
});

  test("create single trail", async () => {
    const trailList = await db.trailStore.addTrail(testTrail);
    assert.isNotNull(trailList._id);
    assertSubset (testTrail, trailList);
  });

  test("get multiple tracks", async () => {
    const tracks = await db.trackStore.getTracksByPlaylistId(beethovenList._id);
    assert.equal(tracks.length, testTracks.length)
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
