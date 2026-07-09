import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function FmvChart({ data }) {
  const chartData = useMemo(() => {
    if (!data || data.length < 2) return [];
    return data.map(d => ({
      ...d,
      date: new Date(d.t).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      price: d.usdCents / 100
    }));
  }, [data]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-stone-900/90 backdrop-blur-md border border-stone-700/50 p-3 rounded-xl shadow-xl text-white">
          <p className="text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-1">{label}</p>
          <p className="text-lg font-bold text-white">
            ${payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-stone-200/50 shadow-sm h-full flex flex-col animate-fade-up delay-600 card-shine">
      <h2 className="text-[11px] font-bold text-stone-700 uppercase tracking-widest mb-4 border-b border-stone-100 pb-2">30-Day Fair Market Value</h2>
      
      <div className="relative flex-1 min-h-[200px] w-full mt-auto mb-2">
        {chartData.length < 2 ? (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-stone-500">
            Not enough data to plot chart
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7E5E4" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#A8A29E', fontSize: 10 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#A8A29E', fontSize: 10 }}
                tickFormatter={(value) => `$${value}`}
                dx={-10}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#D6D3D1', strokeWidth: 1, strokeDasharray: '5 5' }} />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke="#4F46E5" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorPrice)" 
                activeDot={{ r: 6, fill: '#4F46E5', stroke: '#FFFFFF', strokeWidth: 2 }}
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
