import { AsFahrenheitPipe } from './as-fahrenheit.pipe';

describe('AsFahrenheitPipe', () => {
  it('create an instance', () => {
    const pipe = new AsFahrenheitPipe();
    expect(pipe).toBeTruthy();
  });
});
