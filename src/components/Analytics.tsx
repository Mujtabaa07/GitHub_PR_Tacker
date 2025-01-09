import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useGithubStore } from '../store/githubStore';

export function Analytics() {
  const { pullRequests } = useGithubStore();

  const data = React.useMemo(() => {
    const stats = {
      open: 0,
      merged: 0,
      closed: 0
    };

    pullRequests.forEach(pr => {
      if (pr.merged) stats.merged++;
      else if (pr.state === 'closed') stats.closed++;
      else stats.open++;
    });

    return [
      { name: 'Open', count: stats.open },
      { name: 'Merged', count: stats.merged },
      { name: 'Closed', count: stats.closed }
    ];
  }, [pullRequests]);

  if (!pullRequests.length) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Pull Request Analytics</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}