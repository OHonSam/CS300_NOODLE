import { useState, useEffect } from "react";
import Table from "../../../components/table";
import { fetchGradesReport } from "../../../services/SectionInfoService";
import { getStoredToken, decryptToken } from "../../../services/auth/tokenService";
import { useToast } from "../../../hooks/useToast";

export const SectionGradesView = ({ schoolYear, semester, sectionId }) => {
  const [gradesReport, setGradesReport] = useState([]);
  const { addToast } = useToast();

  useEffect(() => {
    const fetchGradeReportData = async () => {
      try {
        const token = await decryptToken(getStoredToken());
        const studentId = await token.username;
        const data = await fetchGradesReport(schoolYear, semester, sectionId, studentId);
        setGradesReport([data]);
      } catch (error) {
        addToast('error', error.message || 'Failed to fetch grades report');
      }
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