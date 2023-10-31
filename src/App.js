import React, { Component } from 'react';
import ApexCharts from 'react-apexcharts';
import './SelectionSortVisualization.css';

class SelectionSortVisualization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [10,60,20,40,54,32,23,6,30,34,66,12,45,18,50,75,48],
      currentIndex: 0,
      isSorting: false,
      stepDescription: '',
      delay: 3000,
      isPaused: false,
    };
  }

  startSorting = () => {
    if (!this.state.isSorting) {
      this.setState({ isSorting: true, currentIndex: 0, isPaused: false }, () => {
        this.selectionSort();
      });
    }
  };

 

  restartSorting = () => {
    this.setState({
      array:  [10,60,20,40,54,32,23,6,30,34,66,12,45,18,50,75,48],
      currentIndex: 0,
      isSorting: false,
      isPaused: false,
    });
  };

  selectionSort = () => {
    if (this.state.isPaused) return;
  
    const array = [...this.state.array];
    const currentIndex = this.state.currentIndex;
    if (currentIndex < array.length - 1) {
      let minIndex = currentIndex;
      for (let j = currentIndex + 1; j < array.length; j++) {
        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== currentIndex) {
        // Swap elements
        const temp = array[currentIndex];
        array[currentIndex] = array[minIndex];
        array[minIndex] = temp;
  
        this.setState({
          array: array,
          currentIndex: currentIndex + 1,
          stepDescription: `Swapping ${array[currentIndex]} and ${array[minIndex]}`,
        });
  
        setTimeout(() => {
          this.selectionSort();
        }, this.state.delay);
      }
    } else {
      this.setState({ isSorting: false });
    }
  };
  

  render() {
    const { array, currentIndex, isSorting, stepDescription, isPaused } = this.state;

    const chartOptions = {
      chart: {
        id: 'selectionSortChart',
        type: 'bar',
      },
      xaxis: {
        categories: array.map((_, i) => i + 1),
      },
    };

    const chartSeries = [
      {
        name: 'Array',
        data: array,
      },
    ];

    return (
      <div className="selection-sort-container">
        <h1>Selection Sort Visualization</h1>
        <div className="button-container-top-right">
          <button onClick={this.startSorting} disabled={isSorting}>
            Start Sorting
          </button>
          
          <button onClick={this.restartSorting} disabled={isSorting}>
            Restart
          </button>
          <br></br>
        </div>
        <div className="array-container">
          {array.map((value, index) => (
            <div
              key={index}
              className={`array-box ${index === currentIndex ? 'current' : ''}`}
              style={{
                backgroundColor: index === currentIndex ? 'blue' : 'transparent',
              }}
            >
              {value}
            </div>
          ))}
          <div style={{ width: '100px', height: '450px' }}>
            <ApexCharts options={chartOptions} series={chartSeries} type="bar" />
          </div>
        </div>
        <div className="description-container">
          <p className="step-description">{stepDescription}</p>
        </div>
      </div>
    );
  }
}

export default SelectionSortVisualization;
