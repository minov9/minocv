
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Wand2 } from 'lucide-react';
import { CVData } from '@/lib/types';
import { toast } from 'sonner';

interface TailorCVDialogProps {
  cvData: CVData;
  onTailored: (data: CVData) => void;
}

export function TailorCVDialog({ cvData, onTailored }: TailorCVDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [openaiKey, setOpenaiKey] = useState(localStorage.getItem('minocv-openai-key'));

  useEffect(() => {
    localStorage.setItem('minocv-openai-key', openaiKey)
  }, [openaiKey]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!jobTitle.trim() || !jobDescription.trim()) {
      toast.error('请填写所有字段');
      return;
    }

    setLoading(true);

    const photo = cvData?.basicInfo?.photo;

    if (photo) delete cvData?.basicInfo?.photo;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${window.localStorage.getItem('minocv-openai-key') || import.meta.env.VITE_OPENAI_API_KEY || ''}`
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: `You are a professional CV tailor who specializes in optimizing CVs for specific job applications.
              Your task is to analyze the provided CV and the target job description, then return a JSON object with an optimized version of the CV.
              Focus on:
              1. Highlighting relevant skills and experiences that match the job description
              2. Using industry-specific keywords from the job description
              3. Quantifying achievements where possible
              4. Ensuring ATS compatibility by using standard section headings
              5. Maintaining a professional, concise tone

              Do not invent new experiences or qualifications. Only enhance existing content to better match the job description.
              Return ONLY a valid JSON object matching the exact structure of the input CV.`
            },
            {
              role: 'user',
              content: `I'm applying for a "${jobTitle}" position. Here's the job description:

              ${jobDescription}

              Here's my current CV data in JSON format:

              ${JSON.stringify(cvData, null, 2)}

              Please tailor my CV for this specific job. Return the result as a valid JSON object with the same structure as my input CV.`
            }
          ],
          temperature: 0.7,
          max_tokens: 4000
        })
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message || 'Error tailoring CV');
      }

      const content = data.choices[0]?.message?.content;

      if (!content) {
        throw new Error('Empty response from API');
      }

      // Extract JSON from the response
      let jsonMatch = content.match(/```json\n([\s\S]*)\n```/);
      let jsonStr = jsonMatch ? jsonMatch[1] : content;

      if (jsonStr.startsWith('```') && jsonStr.endsWith('```')) {
        jsonStr = jsonStr.slice(3, -3);
      }

      const tailoredCV = JSON.parse(jsonStr);

      if (photo) tailoredCV.basicInfo.photo = photo;

      onTailored(tailoredCV);
      toast.success('简历已根据岗位描述优化完成！');
      setOpen(false);
    } catch (error) {
      console.error('Error tailoring CV:', error);
      toast.error('优化失败，请重试或检查 API Key');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Wand2 className="h-4 w-4" />
          <span>根据岗位描述优化</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>智能优化简历</DialogTitle>
          <DialogDescription>
            输入目标岗位和职位描述，AI 将帮你优化简历内容以更好地匹配该岗位。
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="job-title" className="text-sm font-medium">
              OpenAI API Key（获取方式见 <a className="text-blue-500" href="https://help.openai.com/en/articles/4936850-where-do-i-find-my-openai-api-key" target="_blank">OpenAI 官网</a>）
            </Label>
            <Input
              id="job-title"
              value={openaiKey}
              onChange={(e) => setOpenaiKey(e.target.value)}
              placeholder="sk-proj***"
              disabled={loading}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="job-title" className="text-sm font-medium">
              目标岗位
            </Label>
            <Input
              id="job-title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="高级前端工程师"
              disabled={loading}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="job-description" className="text-sm font-medium">
              职位描述
            </Label>
            <Textarea
              id="job-description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="粘贴完整的职位描述..."
              className="min-h-[200px] resize-y transition-all duration-200 focus:ring-2 focus:ring-primary/10"
              disabled={loading}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              取消
            </Button>
            <Button type="submit" disabled={loading || !jobTitle.trim() || !jobDescription.trim()}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  优化中...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  开始优化
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
