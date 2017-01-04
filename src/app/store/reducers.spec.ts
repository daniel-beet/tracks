

import * as model from './model';
import * as actions from './actions';
import { reducerTracks } from './reducers';

const assign = Object.assign;

describe('tracks', () => {
  let state;
  beforeEach(() => {
    state = assign({}, model.initialState);
  });

  it('should handle adding tracks', () => {

    let s = reducerTracks(state, actions.addTrack({
      kind: 'time'
    }));
    expect(s.tracks.length).toBe(1);
    let track = s.tracksEntities[s.tracks[0]];
    expect(track.id).toEqual(s.tracks[0]);
    expect(track.kind).toBe('time');
    expect(track.desc).toBe('Track 1');
    expect(s.counter).toBe(1);

    s = reducerTracks(s, actions.addTrack({
      kind: 'counter'
    }));
    expect(s.tracks.length).toBe(2);
    track = s.tracksEntities[s.tracks[1]];
    expect(track.kind).toBe('counter');

  });


  it('should handle tracking time', () => {
    let ti = (new Date()).valueOf();
    let s = reducerTracks(state, actions.addTrack({}));
    expect(s.tracks.length).toBe(1);
    let track = s.tracksEntities[s.tracks[0]];
    s = reducerTracks(s, actions.trackStart(track.id));
    expect(s.logs.length).toBe(1);
    track = s.tracksEntities[track.id];
    expect(track.lastRecord).toBeGreaterThanOrEqual(ti);
    expect(track.state).toBe('recording');

    s.tracksEntities[track.id].lastRecord -= 100;
    s = reducerTracks(s, actions.trackStop(track.id));
    expect(s.logs.length).toBe(2);
    // expect(s.tracksEntities[track.id].amount).toBe(100);

    expect(s.logsEntities[s.logs[0]].action).toBe('recording');
    expect(s.logsEntities[s.logs[1]].action).toBe('stop');
    // expect(s.logsEntities[s.logs[1]].amount).toBe(100);

  });





});
