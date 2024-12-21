const Section = ({ sectionId, sectionName, teachersName, credits, year, semester, noOfStudents, gpa, noOfFails }) => {
  return (
    <div class="border rounded-lg shadow-md p-4 bg-white w-full">
      <div class="flex justify-between items-center pb-2">
        <h1 class="font-bold text-lg">{sectionId} - {sectionName}</h1>
      </div>
      <div class="grid grid-cols-7 text-sm font-bold border-b pb-2 justify-items-center">
        <div class="col-span-1 justify-self-start">Teachers</div>
        <div>Credits</div>
        <div>Year</div>
        <div>Semester</div>
        <div>No. Students</div>
        <div>Avg. Score</div>
        <div>No. Fails</div>
      </div>

      <div class="grid grid-cols-7 text-sm pt-2">
        <div class="col-span-1 space-y-2 flex flex-col justify-center">
          {teachersName === undefined ? '-' :
            teachersName.map((teacher) => (
              <div>{teacher}</div>
            ))}
        </div>
        <div class="col-span-6 space-y-2">
          <div class="grid grid-cols-6 justify-items-center items-center h-full">
            <div class="flex items-center">{credits === undefined ? '-' : credits}</div>
            <div class="flex items-center">{year === undefined ? '-' : year}</div>
            <div class="flex items-center">{semester === undefined ? '-' : semester}</div>
            <div class="flex items-center">{noOfStudents === undefined ? '-' : noOfStudents}</div>
            <div class="flex items-center">{gpa === undefined ? '-' : gpa.toFixed(2)}</div>
            <div class="flex items-center">{noOfFails === undefined ? '-' : noOfFails}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section;