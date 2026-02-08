
import { Summary as SummaryType } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface SummaryProps {
  data: SummaryType;
  onChange: (data: SummaryType) => void;
}

export function Summary({ data, onChange }: SummaryProps) {
  return (
    <Card className="bg-white/50 backdrop-blur-sm border border-gray-100 shadow-sm">
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center">
            <FileText className="w-4 h-4 mr-2 text-muted-foreground" />
            <Label htmlFor="summary" className="text-sm font-medium">个人简介</Label>
          </div>
          <Textarea
            id="summary"
            value={data.content}
            onChange={(e) => onChange({ content: e.target.value })}
            placeholder="总结你的专业经验、技能和职业目标..."
            className="min-h-[150px] resize-y transition-all duration-200 focus:ring-2 focus:ring-primary/10"
          />
          <p className="text-xs text-muted-foreground mt-2">
            简要总结你的专业背景、核心技能和职业成就。
            这个部分能帮助 HR 快速了解你的价值。
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
