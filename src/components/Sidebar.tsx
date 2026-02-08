
import { useState, useRef } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BasicInfo } from '@/components/sections/BasicInfo';
import { Summary } from '@/components/sections/Summary';
import { Experiences } from '@/components/sections/Experiences';
import { Education } from '@/components/sections/Education';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { GeneralSection } from '@/components/sections/GeneralSection';
import { ThemeSelector } from '@/components/ThemeSelector';
import { TailorCVDialog } from '@/components/TailorCVDialog';
import { ConfigurationPanel } from '@/components/ConfigurationPanel';
import { AddSection } from '@/components/AddSectionPanel';
import { DownloadOptions } from '@/components/DownloadOptions';
import { CVData, ThemeType } from '@/lib/types';
import { downloadJSON, readJSONFile } from '@/lib/utils';
import {
  Upload,
  FileJson,
  FileText,
  Settings,
  Palette,
  SlidersHorizontal,
  Download
} from 'lucide-react';
import { toast } from 'sonner';

interface SidebarProps {
  data: CVData;
  onChange: (data: CVData) => void;
}

interface Section {
  id: string;
  label: string;
}

export function Sidebar({ data, onChange }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['basicInfo']);
  const [importKey, setImportKey] = useState<number>(0); // Used to reset file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleThemeChange = (theme: ThemeType) => {
    onChange({ ...data, activeTheme: theme });
  };

  const handleTailoredCV = (tailoredData: CVData) => {
    onChange(tailoredData);
  };

  const handleExportJSON = () => {
    downloadJSON(data, 'cv-data.json');
    toast.success('简历数据导出成功');
  };

  const handleImportJSON = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const importedData = await readJSONFile(file);
      onChange(importedData);
      toast.success('简历数据导入成功');

      // Reset the file input
      setImportKey(prev => prev + 1);
    } catch (error) {
      console.error('Error importing JSON:', error);
      toast.error('导入失败，请检查文件格式');
    }
  };

  const triggerImportDialog = () => {
    fileInputRef.current?.click();
  };

  // 中文标签映射
  const sectionLabels: Record<string, string> = {
    basicInfo: '基本信息',
    summary: '个人简介',
    experiences: '工作经历',
    education: '教育背景',
    skills: '专业技能',
    projects: '项目经历'
  };

  const sections: Section[] = Object.keys(data).filter(key => key !== 'activeTheme' && key !== 'sectionConfig').map(key => ({
    id: key,
    label: sectionLabels[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim()
  }))

  const Components = {
    basicInfo: BasicInfo,
    summary: Summary,
    experiences: Experiences,
    education: Education,
    skills: Skills,
    projects: Projects
  }

  return (
    <div className="w-full h-full flex flex-col bg-gray-50/70 border-r backdrop-blur-sm">
      <div className="p-4 border-b flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium">MinoCV</h2>
          <p className="text-sm text-muted-foreground">配置你的简历内容和样式</p>
        </div>

        <div className="relative">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={triggerImportDialog}
          >
            <Upload className="h-4 w-4" />
            <span>导入</span>
          </Button>
          <input
            ref={fileInputRef}
            key={importKey}
            type="file"
            accept=".json"
            onChange={handleImportJSON}
            className="hidden"
          />
        </div>
      </div>

      <ScrollArea className="flex-1 px-4 py-2" style={{ maxHeight: 'calc(100vh - 82px)' }}>
        <div className="space-y-6">
          <Accordion
            type="multiple"
            value={expandedSections}
            onValueChange={setExpandedSections}
            className="space-y-4"
          >
            {sections.map((section) => {
              const Component = Components[section.id] ?? GeneralSection;
              return <AccordionItem key={section.id} value={section.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
                <AccordionTrigger className="px-4 py-3 hover:bg-gray-100/50 transition-colors">
                  {section.label}
                </AccordionTrigger>
                <AccordionContent className="pt-2 px-4 pb-4">
                  <Component
                    data={data[section.id]}
                    onChange={(newData) => onChange({ ...data, [section.id]: newData })}
                  />
                </AccordionContent>
              </AccordionItem>
            })}

            <div className="w-full flex items-center justify-between">
              <AddSection cvData={data} onChange={onChange} />
              <ConfigurationPanel cvData={data} onChange={onChange} />
            </div>

            <AccordionItem value="theme" className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
              <AccordionTrigger className="px-4 py-3 hover:bg-gray-100/50 transition-colors">
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  <span>主题</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 px-4 pb-4">
                <ThemeSelector
                  selectedTheme={data.activeTheme}
                  onChange={handleThemeChange}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="space-y-4 py-4">
            <div className="space-y-3 bg-white/80 backdrop-blur-sm p-4 rounded-lg border shadow-sm">
              <DownloadOptions cvData={data} />
            </div>

            <div className="space-y-3 p-4 bg-white/80 backdrop-blur-sm rounded-lg border shadow-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-1">
                  <Settings className="h-4 w-4" />
                  <h3 className="text-sm font-medium">AI 优化</h3>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {/* <ConfigurationPanel cvData={data} onChange={onChange} /> */}
                  <TailorCVDialog cvData={data} onTailored={handleTailoredCV} />
                </div>
              </div>
            </div>

            <div className="space-y-3 p-4 bg-white/80 backdrop-blur-sm rounded-lg border shadow-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-1">
                  <SlidersHorizontal className="h-4 w-4" />
                  <h3 className="text-sm font-medium">导出</h3>
                </div>

                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2 justify-center"
                  onClick={handleExportJSON}
                >
                  <FileJson className="h-4 w-4" />
                  <span>导出 JSON</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
