export default function sortTeamWorkoutResults(resultsArray, teamWorkoutType) {
  if (teamWorkoutType === 'time') {
    resultsArray.sort((a, b) => {
      return b.distance - a.distance;
    });
  } else if (teamWorkoutType === 'distance') {
    resultsArray.sort((a, b) => {
      return a.time - b.time;
    });
  }

  return resultsArray;
}
