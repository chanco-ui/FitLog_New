'use client';

import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { useAppContext } from '@/context/AppContext';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TooltipContext {
  dataIndex: number;
  parsed: {
    y: number;
  };
}

export default function WeightHistoryPage() {
  const router = useRouter();
  const { weights } = useAppContext();

  const handleBack = () => {
    router.back();
  };

  // 日付順にソート
  const sortedWeights = weights.sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // グラフデータの準備
  const chartData = {
    labels: sortedWeights.map(weight => 
      format(new Date(weight.date), 'M/d', { locale: ja })
    ),
    datasets: [
      {
        label: '体重 (kg)',
        data: sortedWeights.map(weight => weight.weight),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.1,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
        callbacks: {
          title: function(context: TooltipContext[]) {
            const index = context[0].dataIndex;
            const weight = sortedWeights[index];
            return format(new Date(weight.date), 'yyyy年M月d日', { locale: ja });
          },
          label: function(context: TooltipContext) {
            return `体重: ${context.parsed.y}kg`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: '#e5e7eb',
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12,
          },
          callback: function(tickValue: string | number) {
            return tickValue + 'kg';
          },
        },
      },
    },
  };

  // 統計情報の計算
  const getStats = () => {
    if (sortedWeights.length === 0) return null;
    
    const weights = sortedWeights.map(w => w.weight);
    const minWeight = Math.min(...weights);
    const maxWeight = Math.max(...weights);
    const avgWeight = weights.reduce((a, b) => a + b, 0) / weights.length;
    
    const latestWeight = sortedWeights[sortedWeights.length - 1];
    const firstWeight = sortedWeights[0];
    const totalChange = latestWeight.weight - firstWeight.weight;
    
    return {
      minWeight,
      maxWeight,
      avgWeight,
      totalChange,
      latestWeight,
      firstWeight,
    };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen">
      <Header 
        title="体重履歴"
        showBackButton 
        onBack={handleBack}
      />
      
      <main className="p-4 space-y-6">
        {sortedWeights.length > 0 ? (
          <>
            {/* グラフ */}
            <Card>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-black mb-4">体重推移</h3>
                <div className="h-64">
                  <Line data={chartData} options={chartOptions} />
                </div>
              </div>
            </Card>

            {/* 統計情報 */}
            {stats && (
              <Card>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-black">統計</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">
                        {stats.minWeight.toFixed(1)}kg
                      </p>
                      <p className="text-sm text-gray-600">最低体重</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-red-600">
                        {stats.maxWeight.toFixed(1)}kg
                      </p>
                      <p className="text-sm text-gray-600">最高体重</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">
                        {stats.avgWeight.toFixed(1)}kg
                      </p>
                      <p className="text-sm text-gray-600">平均体重</p>
                    </div>
                    <div className="text-center">
                      <p className={`text-2xl font-bold ${stats.totalChange >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {stats.totalChange >= 0 ? '+' : ''}{stats.totalChange.toFixed(1)}kg
                      </p>
                      <p className="text-sm text-gray-600">総変化量</p>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* 最近の記録 */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-black">最近の記録</h3>
              {sortedWeights.slice(-5).reverse().map((weight, index) => {
                const previousWeight = sortedWeights[sortedWeights.length - 1 - index - 1];
                const change = previousWeight ? weight.weight - previousWeight.weight : null;
                
                return (
                  <Card key={weight.id} className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <p className="text-2xl font-bold text-black">{weight.weight}kg</p>
                          {change && (
                            <div className={`text-sm px-2 py-1 rounded ${
                              change > 0 
                                ? 'bg-red-100 text-red-700' 
                                : 'bg-green-100 text-green-700'
                            }`}>
                              {change > 0 ? '+' : ''}{change.toFixed(1)}kg
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {format(new Date(weight.date), 'yyyy年M月d日 (EEEE)', { locale: ja })}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </>
        ) : (
          <Card className="p-6 text-center text-gray-600">
            <p>まだ体重記録がありません</p>
            <p className="text-sm mt-1">体重を記録してみましょう！</p>
          </Card>
        )}
      </main>
    </div>
  );
} 