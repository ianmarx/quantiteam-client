import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from 'victory';

const DistanceChart = (props) => {
  return (
    <VictoryChart
      domainPadding={40}
      className='victory-container'
    >
      <VictoryLabel x={130}
        y={25}
        text="Workout Totals by Activity"
      />
      <VictoryAxis
        tickValues={['Erg', 'Row', 'Bike', 'Run']}
      />
      <VictoryAxis
        dependentAxis
        tickFormat={x => (`${x}km`)}
      />
      <VictoryBar
        data={[
          { type: 'Erg', distance: ((props.user.ergTotal / 1000) || 0), fill: '#ffaf11' },
          { type: 'Row', distance: ((props.user.rowTotal / 1000) || 0), fill: '#2b85bc' },
          { type: 'Run', distance: ((props.user.runTotal / 1000) || 0), fill: '#5cb73e' },
          { type: 'Bike', distance: ((props.user.bikeTotal / 1000) || 0), fill: '#d65342' },
        ]}
        x="type"
        y="distance"
      />
    </VictoryChart>
  );
};

export default DistanceChart;
