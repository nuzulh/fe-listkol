import { OldAnalysis } from '@/lib/models'
import { useMemo } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type Props = { data: OldAnalysis[] };

export function AnalysisLineChart({ data }: Props) {
  const convertedData = useMemo(
    () => data.map(x => ({
      date: Intl.DateTimeFormat('id-ID', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(x.createdAt)),
      'Engagement Rate': x.engagementRate.toFixed(2),
      Views: x.viewCount,
      Likes: x.likeCount,
      Comments: x.commentCount,
      Shares: x.shareCount,
      Collects: x.collectCount,
    })),
    []
  );

  return (
    <ResponsiveContainer width='100%' height={300}>
      <LineChart data={convertedData} margin={{ top: 10, right: 20 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' className='text-sm' />
        <YAxis className='text-sm' min={0} max={100} />
        <Tooltip labelClassName='text-xs' />
        <Legend />
        <Line type='monotone' dataKey='Engagement Rate' stroke='red' />
        {/* <Line type='monotone' dataKey='Views' stroke='purple' />
        <Line type='monotone' dataKey='Likes' stroke='brown' />
        <Line type='monotone' dataKey='Comments' stroke='orange' />
        <Line type='monotone' dataKey='Shares' stroke='blue' />
        <Line type='monotone' dataKey='Collects' stroke='green' /> */}
      </LineChart>
    </ResponsiveContainer>
  );
}
