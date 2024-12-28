export const SEMESTER_OPTIONS = [
    { value: '1', label: '1st Semester' },
    { value: '2', label: '2nd Semester' },
    { value: '3', label: '3rd Semester' }
  ];

export const FilterBar = ({ 
    selectedYear, 
    selectedSemester, 
    schoolYears, 
    onYearChange, 
    onSemesterChange 
  }) => (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex gap-4">
        <select
          className="p-2 rounded-lg border border-gray-300"
          value={selectedYear}
          onChange={(e) => onYearChange(e.target.value)}
        >
          {schoolYears.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        <select
          className="p-2 rounded-lg border border-gray-300"
          value={selectedSemester}
          onChange={(e) => onSemesterChange(e.target.value)}
        >
          {SEMESTER_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>
    </div>
  );

// <div className="flex justify-between items-center mb-8">
//         <h1 className="text-2xl font-bold">Dashboard</h1>
//         <div className="flex gap-4">
//           <select
//             className="p-2 rounded-lg border border-gray-300"
//             value={selectedYear}
//             onChange={(e) => setSelectedYear(e.target.value)}
//           >
//             {schoolYears.map(({ value, label }) => (
//               <option key={value} value={value}>
//                 {label}
//               </option>
//             ))}
//           </select>
//           <select
//             className="p-2 rounded-lg border border-gray-300"
//             value={selectedSemester}
//             onChange={(e) => setSelectedSemester(e.target.value)}
//           >
//             <option value="1">1st Semester</option>
//             <option value="2">2nd Semester</option>
//             <option value="3">3rd Semester</option>
//           </select>
//         </div>
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <p className="text-lg">Loading...</p>
//         </div>
//       ) : (
//         <></>