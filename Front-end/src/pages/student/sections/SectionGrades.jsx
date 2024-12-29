import { useState, useEffect } from "react";
import Table from "../../../components/table";
import { fetchGradesReport } from "../../../services/SectionInfoService";
import { getStoredToken, decryptToken } from "../../../services/auth/tokenService";

export const SectionGradesView = ({ schoolYear, semester, sectionId }) => {
  const [gradesReport, setGradesReport] = useState([]);
  useEffect(() => {
    const fetchGradeReportData = async () => {
      const token = await decryptToken(getStoredToken());
      const studentId = await token.username;
      const data = await fetchGradesReport(schoolYear, semester, sectionId, studentId);
      setGradesReport([data]);
    };

    fetchGradeReportData();
  }, [])

  const headings = [
    { id: 'gradeMidterm', label: 'Midterm' },
    { id: 'gradeFinal', label: 'Final' },
    { id: 'gradeOthers', label: 'Others' },
    { id: 'gradeTotal', label: 'Total' }
  ];

  const handleRowClicked = (row) => { };

  return (
    <div className="relative pt-4 pb-8 flex flex-col h-full w-full">
      <Table headings={headings} data={gradesReport} readOnly={false} onRowClicked={handleRowClicked} rowsPerPage={10} />
    </div>
  );
}

export default SectionGradesView;