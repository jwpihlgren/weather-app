import { AsMilesPerHourPipe } from './as-miles-per-hour.pipe';

describe('AsMilesPerHourPipe', () => {
  it('create an instance', () => {
    const pipe = new AsMilesPerHourPipe();
    expect(pipe).toBeTruthy();
  });
});
