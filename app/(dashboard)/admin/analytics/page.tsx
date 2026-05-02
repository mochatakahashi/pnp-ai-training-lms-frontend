import { Card } from '@/components/ui/card';
import { LineChart, BarChart, PieChart, TrendingUp } from 'lucide-react';

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-foreground">Analytics & Reporting</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Enrollment Rate
              </p>
              <p className="text-3xl font-bold text-foreground">94%</p>
            </div>
            <TrendingUp className="text-primary" size={24} />
          </div>
          <p className="text-xs text-green-600">
            +8% from last month
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Average Pass Rate
              </p>
              <p className="text-3xl font-bold text-foreground">78%</p>
            </div>
            <BarChart className="text-primary" size={24} />
          </div>
          <p className="text-xs text-green-600">
            +5% from last month
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Completion Rate
              </p>
              <p className="text-3xl font-bold text-foreground">68%</p>
            </div>
            <LineChart className="text-primary" size={24} />
          </div>
          <p className="text-xs text-green-600">
            +3% from last month
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Avg. Learning Time
              </p>
              <p className="text-3xl font-bold text-foreground">16.5h</p>
            </div>
            <PieChart className="text-primary" size={24} />
          </div>
          <p className="text-xs text-green-600">
            +2.3h from last month
          </p>
        </Card>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 flex items-center justify-center min-h-96 bg-muted/50">
          <div className="text-center">
            <LineChart className="mx-auto text-muted-foreground mb-4" size={48} />
            <p className="text-muted-foreground">
              Enrollment Trends Chart
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Line chart showing student enrollment over time
            </p>
          </div>
        </Card>

        <Card className="p-6 flex items-center justify-center min-h-96 bg-muted/50">
          <div className="text-center">
            <BarChart className="mx-auto text-muted-foreground mb-4" size={48} />
            <p className="text-muted-foreground">Course Performance</p>
            <p className="text-xs text-muted-foreground mt-2">
              Bar chart comparing course pass rates
            </p>
          </div>
        </Card>

        <Card className="p-6 flex items-center justify-center min-h-96 bg-muted/50">
          <div className="text-center">
            <PieChart className="mx-auto text-muted-foreground mb-4" size={48} />
            <p className="text-muted-foreground">
              Student Distribution
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Pie chart showing student distribution across courses
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-foreground mb-4">
            Top Courses by Enrollment
          </h3>
          <div className="space-y-3">
            {[
              { name: 'Police Ethics and Conduct', students: 120 },
              { name: 'Community Policing Fundamentals', students: 98 },
              { name: 'Crisis Management', students: 87 },
            ].map((course, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-foreground">
                    {course.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {course.students} students
                  </p>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{
                      width: `${(course.students / 120) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
