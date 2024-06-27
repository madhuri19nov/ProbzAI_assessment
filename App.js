import React, { useState } from 'react';
import Chart from './components/Chart';
import TimeframeSelector from './components/TimeframeSelector';
import './styles/chart.css';
import data from './data/data.json';
import html2canvas from 'html2canvas';


const App = () => {
  const [filteredData, setFilteredData] = useState(data);

  const handleTimeframeSelect = (timeframe) => {
    const now = new Date();
    let filtered;

    if (timeframe === 'daily') {
      filtered = data.filter(d => new Date(d.timestamp) > new Date(now.setDate(now.getDate() - 1)));
    } else if (timeframe === 'weekly') {
      filtered = data.filter(d => new Date(d.timestamp) > new Date(now.setDate(now.getDate() - 7)));
    } else if (timeframe === 'monthly') {
      filtered = data.filter(d => new Date(d.timestamp) > new Date(now.setMonth(now.getMonth() - 1)));
    }

    setFilteredData(filtered);
  };

  const handlePointClick = (data) => {
    alert(`Value: ${data.value}`);
  };

  const exportChart = () => {
    html2canvas(document.querySelector('.chart-container')).then(canvas => {
      const link = document.createElement('a');
      link.download = 'chart.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div className="App">
      <TimeframeSelector onSelect={handleTimeframeSelect} />
      <div className="chart-container">
        <Chart data={filteredData} onPointClick={handlePointClick} />
        <button onClick={exportChart}>Export Chart</button>
      </div>
    </div>
  );
};

export default App;
