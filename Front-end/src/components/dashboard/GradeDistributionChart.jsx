import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useState } from 'react';

export const GradeDistributionChart = ({ data }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const colors = {
        A: '#4CAF50',
        B: '#2196F3',
        C: '#FFC107',
        D: '#FF9800',
        F: '#F44336'
    };

    const handleMouseMove = (state) => {
        if (state.isTooltipActive) {
        setActiveIndex(state.activeTooltipIndex);
        } else {
        setActiveIndex(null);
        }
    };

    const handleMouseLeave = () => {
        setActiveIndex(null);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Grade Distribution</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                        <XAxis dataKey="grade" />
                        <YAxis
                            tickFormatter={(value) => Number.isInteger(value) ? value : ''}
                            domain={[0, 'auto']}
                            allowDecimals={false}
                        />
                        <Tooltip
                            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                            contentStyle={{
                                borderRadius: '8px',
                                border: 'none',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                            }}
                        />
                        <Bar
                            dataKey="count"
                            // animationBegin={handleMouseMove}
                            // animationDuration={handleMouseLeave}
                        >
                            {data.map((entry, index) => {
                                const isActive = (activeIndex === index);
                                console.log(activeIndex, index);
                                const fillOpacity = (activeIndex === null)
                                    ? 0.8
                                    : isActive
                                        ? 1  // Keep hovered column at full opacity
                                        : 0.3;  // Dim non-hovered columns

                                return (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={colors[entry.grade]}
                                        fillOpacity={fillOpacity}
                                        strokeWidth={isActive ? 2 : 0}
                                        stroke={colors[entry.grade]}
                                        className="transition-all duration-300"
                                    />
                                );
                            })}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};