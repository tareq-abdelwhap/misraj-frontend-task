const csvReader = async (csvPath) => {
    const res = await fetch(csvPath)
    if ( !res.ok ) throw new Error('Something Went Wrong')
    const csv = await res.text()

    const [headers, ...rest] = csv.split('\n').map(row => row.split(','))

    const data = rest.map(row => {
        return row.reduce((acc, col, index) => {
            acc = { ...acc, [headers[index].trim()]: col.trim() }
            return acc;
        }, {})
    })

    return {headers, data}
}

export { csvReader }