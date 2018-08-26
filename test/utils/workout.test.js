import timeStringToSeconds from '../../src/utils/workout';

describe('utils/workout', () => {
  it('should correctly parse timeString of \'ss\' format', () => {
    const timeString = '30';

    expect(timeStringToSeconds(timeString)).toEqual(30);
  });

  it('should correctly parse timeString of \'mm:ss\' format', () => {
    const timeString = '6:30';

    expect(timeStringToSeconds(timeString)).toEqual(390);
  });

  it('should correctly parse timeString of \'hh:mm:ss\' format', () => {
    const timeString = '1:06:30';

    expect(timeStringToSeconds(timeString)).toEqual(3990);
  });

  it('should return NaN for invalid input', () => {
    // letters are invalid
    const letterString = 'asdf';
    expect(timeStringToSeconds(letterString)).toEqual(NaN);

    // empty string is invalid
    const emptyString = '';
    expect(timeStringToSeconds(emptyString)).toEqual(NaN);

    // aa:bb:cc:dd timeString is invalid
    const timeString = '11:22:33:44';
    expect(timeStringToSeconds(timeString)).toEqual(NaN);
  });
});
