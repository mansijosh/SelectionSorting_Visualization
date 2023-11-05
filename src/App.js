import React, { Component } from 'react';
import ApexCharts from 'react-apexcharts';
import './SelectionSortVisualization.css';

class SelectionSortVisualization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [10, 60, 20, 40, 54, 32, 23, 6, 30, 34, 66, 12, 45, 18, 50, 75, 48],
      currentIndex: 0,
      isSorting: false,
      stepDescription: '',
      delay: 3200,
      isPaused: false,
      customColors: new Array(17).fill('#2E93fA'), // Blue color for all elements
    };
  }

  startSorting = () => {
    if (!this.state.isSorting) {
      this.setState(
        {
          isSorting: true,
          currentIndex: 0,
          isPaused: false,
        },
        () => {
          this.selectionSort();
        }
      );
    }
  };

  restartSorting = () => {
    this.setState({
      array: [10, 60, 20, 40, 54, 32, 23, 6, 30, 34, 66, 12, 45, 18, 50, 75, 48],
      currentIndex: 0,
      isSorting: false,
      isPaused: false,
      customColors: new Array(17).fill('#2E93fA'), // Reset colors to blue
    });
  };

  selectionSort = () => {
    if (this.state.isPaused) return;

    const array = [...this.state.array];
    const currentIndex = this.state.currentIndex;
    const customColors = [...this.state.customColors];

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

        // Change the colors of swapping elements
        customColors[currentIndex] = '#54e869';
        customColors[minIndex] = '#54e869';

        this.setState({
          array: array,
          currentIndex: currentIndex + 1,
          stepDescription: `Swapping ${array[currentIndex]} and ${array[minIndex]}`,
          customColors: customColors,
        });

        setTimeout(() => {
          // Reset the colors to blue
          customColors[currentIndex] = '#2E93fA';
          customColors[minIndex] = '#2E93fA';
          this.selectionSort();
        }, this.state.delay);
      }
    } else {
      this.setState({ isSorting: false });
    }
  };

  render() {
    const { array, currentIndex, isSorting, stepDescription, isPaused, customColors } = this.state;

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
        data: array.map((value, index) => ({
          x: index + 1,
          y: value,
          fillColor: customColors[index],
        })),
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
          <div style={{ width: '1750px', height: '450px' }}>
            <ApexCharts options={chartOptions} series={chartSeries} type="bar" />
          </div>
        </div>
        <div className="description-container">
          <p className="stepDescription">{stepDescription}</p>
        </div>
      </div>
    );
  }
}

export default SelectionSortVisualization;
