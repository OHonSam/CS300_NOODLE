
const Table = ({  headings, rows, className }) => {
  return (
    <div className={`relative overflow-x-auto px-4 ${className}`}>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
          <tr>
            {headings.map((heading, index) => {
              return (
                <th key={index} scope="col" className="px-6 py-3">
                  {heading}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              {row.map((item, itemIndex) => (
                <td key={itemIndex} scope="row" className="px-6 py-4">
                  {item}
                </td>
              ))}
            </tr>  
          ))}
        </tbody>
      </table>
    </div>

  )
}

export default Table