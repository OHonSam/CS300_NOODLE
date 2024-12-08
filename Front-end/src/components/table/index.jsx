
const Table = ({ children, onRowClicked, headings, data, readOnly=true, className }) => {
  return (
    <div className={`relative overflow-x-auto px-4 w-full ${className}`}>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 shadow-md rounded">
        <thead className="text-xs text-gray-700 uppercase bg-grey-200">
          <tr>
            {headings.map((heading, index) => {
              return (
                <th key={index} scope="col" className="px-6 py-3">
                  {heading.label}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={`bg-white border-b ${!readOnly && 'hover:bg-grey-100'}`}>
              {headings.map((heading, itemIndex) => (
                <td key={itemIndex} scope="row" className="px-6 py-4 select-none"
                  onClick={() => onRowClicked(row)}>
                  {row[heading.id]}
                </td>
              ))}
            </tr>  
          ))}
        </tbody>
      </table>
      {children}
    </div>

  )
}

export default Table