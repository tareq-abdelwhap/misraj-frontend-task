import './DataTable.css'
import React, { useState, useEffect } from "react"
import { DataTable as PrimeDataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext'
import { Message } from 'primereact/message'
import { csvReader } from './utils/csvReader';

const DataTable = () => {
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


    const cellEditor = ({ value, editorCallback }) => (
        <InputText type="text" value={value} onChange={(e) => editorCallback(e.target.value)} onKeyDown={(e) => e.stopPropagation()} />
    );
    
    const onCellEditComplete = (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;

        if (newValue.trim().length > 0) rowData[field] = newValue;
        else event.preventDefault();
    };

    return (
        <div className="card">
            {!!error && <Message severity="error" text={error} />}
            <PrimeDataTable
                loading={loading}
                value={data}
                emptyMessage="No Content."
                columnResizeMode="expand"
                reorderableRows
                onRowReorder={(e) => setData(e.value)} 
                resizableColumns
                scrollable
                scrollHeight="650px"
                stripedRows
                removableSort
                editMode="cell"
                paginator
                rows={10}
                rowsPerPageOptions={[10, 20, 30, 50]}
                tableStyle={{ width: '50rem', minHeight: '600px' }}
            >
                <Column frozen rowReorder style={{ width: '3rem' }} />
                {headers.map((col, index) => (
                    <Column
                        frozen={!index}
                        style={!index && { boxShadow:'2px 0 7px 0.5px #00000025' }}
                        sortable
                        key={col}
                        field={col}
                        header={col}
                        editor={(options) => cellEditor(options)} 
                        onCellEditComplete={onCellEditComplete}
                    />
                ))}
            </PrimeDataTable>
        </div>
    )
}

export default DataTable