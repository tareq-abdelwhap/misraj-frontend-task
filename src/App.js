import "primereact/resources/themes/lara-light-cyan/theme.css";
import './App.css';
import { useEffect, useState } from "react";
import { csvReader } from './utils/csvReader';
import DataTable from './components/DataTable';

export default function App() {
  const [headers, setHeaders] = useState([])
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
      (async () => {
          setLoading(true)
          setError(null)
          try {
              const { headers, data } = await csvReader('/database/supermarket_sales.csv')
              setData(data)
              setHeaders(headers)
          } catch (e) {
              console.error(e)
              setError('Failed to fetch the data')
          }
          setLoading(false)
      })()
  }, [])


  return (
    <div className="App">
      <DataTable
        loading={loading}
        headers={headers}
        data={data}
        setData={setData}
        error={error}
      />
    </div>
  );
}
