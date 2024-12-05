import Table from "../../../../components/table";
import Pager from "../../../../components/footer/pager";

const StudentAccountView = () => {
  const headings = ['Student ID', 'Full name', 'Gender', 'Class', 'GPA'];
  const rows = [
    ['22125009', 'Ngo Thien Bao', 'Male', '22TT2', '8.0'],
    ['22125010', 'Phan Phuc Bao', 'Male', '22TT2', '9.1'],
    ['22125085', 'O Hon Sam', 'Male', '22TT2', '9.6']
  ];

  return (
    <div className="mt-8 flex flex-col justify-between h-[80%] w-full">
      <Table headings={headings} rows={rows}/>
      <Pager 
        numberOfPages={14}
        onPageChange={(page) => console.log(`Page changed to: ${page}`)}
        className="w-full flex justify-center"/>
    </div>
  );
};

export default StudentAccountView;