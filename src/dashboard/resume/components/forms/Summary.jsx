import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import GlobalApi from './../../../../../service/GlobalApi'
import { useParams } from "react-router-dom";
import { Brain, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { sendToGemini } from './../../../../../service/AI_Model'

const prompt =
  "Job Title: {jobTitle}. Based on this job title, write a professional, 2-3 sentence resume summary suitable for that role.";

function Summary({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summary, setSummary] = useState(resumeInfo.summary || "");
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    setSummary(resumeInfo.summary || "");
  }, [resumeInfo.summary]);

  useEffect(() => {
    if (summary !== undefined && summary !== resumeInfo.summary) {
      setResumeInfo({
        ...resumeInfo,
        summary,
      });
    }
  }, [summary]);

  const GenSummFromAI = async () => {
    if (!resumeInfo?.jobTitle) {
      toast("Please fill in your job title before generating a summary.");
      return;
    }
    setLoading(true);
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo.jobTitle);
    try {
      const result = await sendToGemini(PROMPT);
      console.log("Gemini AI response:", result);
      setSummary(result);
    } catch (err) {
      toast("AI generation failed: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: { summary },
    };
    try {
      await GlobalApi.UpdateResumeDetail(params?.resumeId, data);
      enabledNext(true);
      toast("Details Updated");
    } catch {
      toast("Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add a summary for your Job Title.</p>
      </div>
      <form className="mt-7" onSubmit={onSave}>
        <div className="flex justify-between items-end">
          <label>Add Summary</label>
          <Button
            variant="outline"
            onClick={GenSummFromAI}
            type="button"
            disabled={loading}
            className="border-primary text-primary size-sm flex gap-2"
          >
            <Brain className="h-4 w-4" />
            {loading ? "Generating..." : "Generate from AI"}
          </Button>
        </div>
        <Textarea
          className="mt-5 h-24"
          required
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          disabled={loading}
        />
        <div className="mt-2 flex justify-end">
          <Button
            type="submit"
            disabled={loading || !summary}
            className="flex items-center gap-2"
          >
            {loading && <LoaderCircle className="animate-spin" />}
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Summary;