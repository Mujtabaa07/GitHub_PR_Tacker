import React, { useState } from 'react';
import { GitPullRequest, GitMerge, XCircle, Download, Filter, ExternalLink, Copy, Check } from 'lucide-react';
import { useGithubStore } from '../store/githubStore';
import type { PullRequest } from '../types/github';

function StatusBadge({ pr }: { pr: PullRequest }) {
  if (pr.merged) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
        <GitMerge size={14} className="mr-1" />
        Merged
      </span>
    );
  }
  
  if (pr.state === 'closed') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        <XCircle size={14} className="mr-1" />
        Closed
      </span>
    );
  }
  
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
      <GitPullRequest size={14} className="mr-1" />
      Open
    </span>
  );
}

function CopyButton({ text, isChecked, onToggleCheck }: { 
  text: string; 
  isChecked: boolean;
  onToggleCheck: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleCopy}
        className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
        title="Copy link"
      >
        {copied ? (
          <Check size={14} className="text-green-500" />
        ) : (
          <Copy size={14} />
        )}
      </button>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onToggleCheck}
        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
        title="Mark as points allocated"
      />
    </div>
  );
}

function LabelBadge({ name, color }: { name: string; color: string }) {
  // Ensure readable contrast by using a darker text color
  const textColor = parseInt(color, 16) > 0xffffff / 2 ? '#000000' : '#ffffff';
  
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mr-1"
      style={{
        backgroundColor: `#${color}`,
        color: textColor,
      }}
    >
      {name}
    </span>
  );
}

export function PRTable() {
  const { pullRequests, isLoading, checkedPRs, togglePRCheck } = useGithubStore();
  const [sortField, setSortField] = useState<keyof PullRequest>('number');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filters, setFilters] = useState({
    status: 'all',
    search: '',
    label: ''
  });

  const handleSort = (field: keyof PullRequest) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const uniqueLabels = React.useMemo(() => {
    const labels = new Set<string>();
    pullRequests.forEach(pr => {
      pr.labels.forEach(label => labels.add(label.name));
    });
    return Array.from(labels);
  }, [pullRequests]);

  const filteredAndSortedPRs = React.useMemo(() => {
    let filtered = [...pullRequests];

    // Apply status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(pr => {
        switch (filters.status) {
          case 'merged':
            return pr.merged === true;
          case 'closed':
            return pr.state === 'closed' && !pr.merged;
          case 'open':
            return pr.state === 'open';
          default:
            return true;
        }
      });
    }

    // Apply label filter
    if (filters.label) {
      filtered = filtered.filter(pr =>
        pr.labels.some(label => label.name === filters.label)
      );
    }

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(pr =>
        pr.title.toLowerCase().includes(searchLower) ||
        pr.user.login.toLowerCase().includes(searchLower)
      );
    }

    // Sort
    return filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const modifier = sortDirection === 'asc' ? 1 : -1;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue) * modifier;
      }
      
      return ((aValue as number) - (bValue as number)) * modifier;
    });
  }, [pullRequests, sortField, sortDirection, filters]);

  const exportToCSV = () => {
    const headers = ['PR Number', 'Title', 'Status', 'Author', 'Labels', 'Created Date'];
    const rows = filteredAndSortedPRs.map(pr => [
      pr.number,
      pr.title,
      pr.merged ? 'Merged' : pr.state,
      pr.user.login,
      pr.labels.map(l => l.name).join(', '),
      new Date(pr.created_at).toLocaleDateString()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pull-requests.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading pull requests...</div>;
  }

  if (!pullRequests.length) {
    return <div className="text-center py-8">No pull requests found</div>;
  }

  // Update table headers to remove merged status
  const tableHeaders = [
    { key: 'number', label: 'PR' },
    { key: 'title', label: 'Title' },
    { key: 'state', label: 'Status' },
    { key: 'user', label: 'Author' },
    { key: 'labels', label: 'Labels' },
    { key: 'created_at', label: 'Created' }
  ];

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <select
                value={filters.status}
                onChange={(e) => setFilters(f => ({ ...f, status: e.target.value }))}
                className="w-full sm:w-auto pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All PRs</option>
                <option value="open">Open</option>
                <option value="merged">Merged</option>
                <option value="closed">Closed (Unmerged)</option>
              </select>
              <Filter className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            </div>
            
            <select
              value={filters.label}
              onChange={(e) => setFilters(f => ({ ...f, label: e.target.value }))}
              className="w-full sm:w-auto px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Labels</option>
              {uniqueLabels.map(label => (
                <option key={label} value={label}>{label}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Search PRs..."
              value={filters.search}
              onChange={(e) => setFilters(f => ({ ...f, search: e.target.value }))}
              className="w-full sm:w-auto px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={exportToCSV}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {tableHeaders.map(({ key, label }) => (
                <th
                  key={key}
                  onClick={() => handleSort(key as keyof PullRequest)}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  {label}
                  {sortField === key && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedPRs.map((pr) => (
              <tr key={pr.number} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <div className="flex items-center gap-2">
                    <a 
                      href={pr.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                    >
                      #{pr.number}
                      <ExternalLink size={14} />
                    </a>
                    <CopyButton 
                      text={pr.html_url} 
                      isChecked={checkedPRs[pr.html_url] || false}
                      onToggleCheck={() => togglePRCheck(pr.html_url)}
                    />
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <a 
                    href={pr.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600"
                  >
                    {pr.title}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge pr={pr} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      className="h-6 w-6 rounded-full"
                      src={pr.user.avatar_url}
                      alt={pr.user.login}
                    />
                    <span className="ml-2 text-sm text-gray-900">{pr.user.login}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {pr.labels.length > 0 ? (
                      pr.labels.map((label) => (
                        <LabelBadge key={label.name} name={label.name} color={label.color} />
                      ))
                    ) : (
                      <span className="text-gray-400 text-sm">No labels</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(pr.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}