import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const GradeDistributionChart = ({ data }) => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Grade Distribution</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="grade" />
            <YAxis 
              tickFormatter={(value) => Number.isInteger(value) ? value : ''} 
              domain={[0, 'auto']}
              allowDecimals={false}
            />
            <Tooltip />
            <Bar dataKey="count" fill="#1e40af" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );