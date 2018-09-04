import sortTeamWorkoutResults from '../../src/utils/results';

describe('utils/results', () => {
  it('should sort results for time-based team workout from greatest to least distance', () => {
    const results = [
      {
        _id: '1',
        distance: 8250,
        time: 1800,
      },
      {
        _id: '2',
        distance: 8000,
        time: 1800,
      },
      {
        _id: '3',
        distance: 8500,
        time: 1800,
      },
    ];

    expect(sortTeamWorkoutResults(results, 'time')).toEqual([
      {
        _id: '3',
        distance: 8500,
        time: 1800,
      },
      {
        _id: '1',
        distance: 8250,
        time: 1800,
      },
      {
        _id: '2',
        distance: 8000,
        time: 1800,
      },
    ]);
  });

  it('should sort results for distance-based team workout from least to greatest time', () => {
    const results = [
      {
        _id: '1',
        distance: 2000,
        time: 370,
      },
      {
        _id: '2',
        distance: 2000,
        time: 360,
      },
      {
        _id: '3',
        distance: 2000,
        time: 380,
      },
    ];

    expect(sortTeamWorkoutResults(results, 'distance')).toEqual([
      {
        _id: '2',
        distance: 2000,
        time: 360,
      },
      {
        _id: '1',
        distance: 2000,
        time: 370,
      },
      {
        _id: '3',
        distance: 2000,
        time: 380,
      },
    ]);
  });
});
