import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard({ auth, vehicleUsages }) {
  const chartDataDistance = vehicleUsages.reduce((acc, usage) => {
    const vehicleName = usage.reservation.vehicle.name;
    const distance = usage.distance;

    if (!acc[vehicleName]) {
      acc[vehicleName] = { labels: [], distanceData: [] };
    }

    const lastDistance =
      acc[vehicleName].distanceData[acc[vehicleName].distanceData.length - 1] ||
      0;

    acc[vehicleName].distanceData.push(lastDistance + distance);
    acc[vehicleName].labels.push(
      `Pemakaian ke-${acc[vehicleName].distanceData.length}`
    );

    return acc;
  }, {});

  const chartDataFuel = vehicleUsages.reduce((acc, usage) => {
    const vehicleName = usage.reservation.vehicle.name;
    const fuelUsage = usage.fuel_usage;

    if (!acc[vehicleName]) {
      acc[vehicleName] = { labels: [], fuelUsageData: [] };
    }

    const lastFuelUsage =
      acc[vehicleName].fuelUsageData[
        acc[vehicleName].fuelUsageData.length - 1
      ] || 0;

    acc[vehicleName].fuelUsageData.push(lastFuelUsage + fuelUsage);
    acc[vehicleName].labels.push(
      `Pemakaian ke-${acc[vehicleName].fuelUsageData.length}`
    );

    return acc;
  }, {});

  const datasetsDistance = Object.keys(chartDataDistance).map(
    (vehicleName, index) => ({
      label: vehicleName,
      data: chartDataDistance[vehicleName].distanceData,
      fill: false,
      borderColor: `hsl(${
        (index * 360) / Object.keys(chartDataDistance).length
      }, 100%, 50%)`,
      tension: 0.1,
    })
  );

  const datasetsFuel = Object.keys(chartDataFuel).map((vehicleName, index) => ({
    label: vehicleName,
    data: chartDataFuel[vehicleName].fuelUsageData,
    fill: false,
    borderColor: `hsl(${
      (index * 360) / Object.keys(chartDataFuel).length
    }, 100%, 50%)`,
    tension: 0.1,
  }));

  const dataDistance = {
    labels: Object.values(chartDataDistance)[0]?.labels || [],
    datasets: datasetsDistance,
  };

  const dataFuel = {
    labels: Object.values(chartDataFuel)[0]?.labels || [],
    datasets: datasetsFuel,
  };

  const distanceOptions = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return `${value} km`;
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.raw} km`;
          },
        },
      },
    },
  };

  const fuelOptions = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return `${value} liter`;
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.raw} liter`;
          },
        },
      },
    },
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Dashboard" />
      <div className="space-y-8">
        <div>
          <h2 className="font-bold text-black">
            Grafik pemakaian kendaraan (jarak:)
          </h2>
          <Line data={dataDistance} options={distanceOptions} />
        </div>
        <div>
          <h2 className="font-bold text-black">
            Grafik pemakaian kendaraan (BBM):
          </h2>
          <Line data={dataFuel} options={fuelOptions} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
