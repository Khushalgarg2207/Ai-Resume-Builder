import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnUnderline, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg'
import { toast } from 'sonner';
import { sendToGemini } from './../../../../service/AI_Model'

function RIchTextEditor({ value, onRichTextEditorChange, index }) {
    const { resumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false)

    const GenSummFromAI = async () => {
        const positionTitle = resumeInfo?.experience?.[index]?.title;
        if (!positionTitle) {
            toast("Please add Position Title first.");
            return;
        }
        const prompt = `
        Position Title: ${positionTitle}.
        Write a concise, impactful professional summary for this position as 8–10 bullet points.
        Each point should be clear and professional.
        `
        setLoading(true);
        try {
            const result = await sendToGemini(prompt);
            const syntheticEvent = { target: { value: result } };
            onRichTextEditorChange(syntheticEvent);
            toast("AI summary generated!");
        } catch (err) {
            toast("AI generation failed: " + (err.message || err));
        } finally {
            setLoading(false);
        }

    }

    return (
        <div>
            <div className='flex justify-between my-2'>
                <label className='text-xs'>Summary</label>
                <Button onClick={GenSummFromAI}
                    variant="outline" size="sm"
                    className="flex gap-2 border-primary text-primary">
                    {loading ?
                        <LoaderCircle className='animate-spin' /> :
                        <><Brain className='h-4 w-4' />Generate from AI</>
                    }
                </Button>
            </div>
            <EditorProvider>
                <Editor value={value} 
                onChange={onRichTextEditorChange}
                >
                    <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    )
}

export default RIchTextEditor