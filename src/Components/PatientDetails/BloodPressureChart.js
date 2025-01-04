import React, { useState, useEffect } from 'react';
import './PatientDetail.css'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';


// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HealthMetricsChart = ({ data }) => {
  const [selectedRange, setSelectedRange] = useState(6); // Default to 6 months

  // Get the filtered data based on the selected range
  const filteredData = data.diagnosis_history.slice(0, selectedRange);

  // Extract months, years, and corresponding systolic/diastolic values for the filtered range
  const months = filteredData.map((item) => `${item.month.substring(0, 3)} ${item.year}`);
  const systolic = filteredData.map((item) => item.blood_pressure.systolic.value);
  const diastolic = filteredData.map((item) => item.blood_pressure.diastolic.value);

  const [isModalOpen, setIsModalOpen] = useState(false);
  // Extract months, years, and the corresponding systolic and diastolic values
  // const months = data.diagnosis_history.map(item => `${item.month.substring(0, 3)} ${item.year}`);
  // const systolic = data.diagnosis_history.map(item => item.blood_pressure.systolic.value);
  // const diastolic = data.diagnosis_history.map(item => item.blood_pressure.diastolic.value);
   // Filter data based on the selected range

   const handleOverlayClick = (e) => {
    // If the click is on the overlay (outside modal content), close the modal
    if (e.target.classList.contains('chart-modal')) {
      setIsModalOpen(false);
    }
  };

  // Effect hook to add/remove event listener for clicks outside modal
  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('click', handleOverlayClick);
    } else {
      document.removeEventListener('click', handleOverlayClick);
    }
    // Cleanup on unmount or modal close
    return () => {
      document.removeEventListener('click', handleOverlayClick);
    };
  }, [isModalOpen]);
 
 
  // Chart.js data format
  const chartData = {
    labels: months,
    datasets: [
      {
        label: 'Systolic ',
        data: systolic,
        borderColor: '#E66FD2',
        backgroundColor: '#E66FD2',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Diastolic ',
        data: diastolic,
        borderColor: '#8C6FE6',
        backgroundColor: '#8C6FE6',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Chart.js options for customization
  const chartOptions = {
    responsive: true,
    plugins: {
      // title: {
      //   display: true,
      //   text: 'Systolic and Diastolic Blood Pressure Over Time',
      // },
      tooltip: {
        mode: 'nearest',
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
        //   text: 'Month/Year',
        },
      },
      y: {
        title: {
          display: true,
          // text: 'Blood Pressure (mm Hg)',
        },
      },
    },

  };

  return (
  <div className='patient_chart_container'>
   
    {/* <div onClick={() => setIsModalOpen(true)} className="chart-wrapper">
  <Line data={chartData} options={chartOptions} />
</div> */}
<div className='bloodpressurewithselectedrange'>
 <h3>Blood Pressure</h3>
  <div className="dropdown-container">
        <label htmlFor="range-select"></label>
        <select
          id="range-select"
          value={selectedRange}
          onChange={(e) => setSelectedRange(Number(e.target.value))}
        >
          <option value={6}>Last 6 Months</option>
          <option value={12}>Last 12 Months</option>
          <option value={data.diagnosis_history.length}>All Data</option>
        </select>
      </div>
</div>

{/* Button only visible on mobile */}
<button className="show-chart-button mobile-only" onClick={() => setIsModalOpen(true)}>
        Show Chart
      </button>

      {/* Chart visible directly on larger screens */}
      <div className="chart-container desktop-only" onClick={() => setIsModalOpen(true)}>
        <Line data={chartData} options={chartOptions} />
      </div>

{/* Modal for full-screen chart */}
{isModalOpen && (
        <div className="chart-modal">
          <div className="modal-content">
            <button className="close-button" onClick={() => setIsModalOpen(false)}>
              ✖
            </button>
            <h3>Blood Pressure</h3>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthMetricsChart;
