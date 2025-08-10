import { Loader2, PlusSquare } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import GlobalApi from "../../../service/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  const onCreate = async () => {
    if (!user) {
      alert("User is not loaded yet. Please try again.");
      return;
    }

    if (!resumeTitle.trim()) {
      alert("Please enter a valid resume title.");
      return;
    }

    if (!user.primaryEmailAddress?.emailAddress || !user.fullName) {
      alert("User email or name is missing.");
      return;
    }

    setLoading(true);

    const uuid = uuidv4();
    const data = {
      data: {
        Title: resumeTitle.trim(),
        resumeId: uuid,
        userEmail: user.primaryEmailAddress.emailAddress,
        userName: user.fullName,
      },
    };

    try {
      const res = await GlobalApi.CreateNewResume(data);
      console.log(res);

      setLoading(false);
      navigation('/dashboard/resume/'+res.data.data.documentId+"/edit");
      setOpenDialog(false);

      setTimeout(() => setResumeTitle(""), 300);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="group p-14 py-24 border-2 border-dashed border-gray-400 flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-xl h-[280px] cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-lg hover:border-gray-600 focus:ring-2 focus:ring-gray-300 outline-none"
        onClick={() => setOpenDialog(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpenDialog(true);
          }
        }}
        aria-label="Open create new resume dialog"
      >
        <PlusSquare size={48} className="text-gray-800 drop-shadow group-hover:text-black" />
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md bg-white rounded-xl shadow-2xl border-2 border-gray-200">
          <DialogHeader>
            <DialogTitle className="text-gray-900 text-2xl font-semibold mb-1">
              Create New Resume
            </DialogTitle>
            <DialogDescription className="mb-6 text-gray-600">
              Add a title for your new resume.
            </DialogDescription>
          </DialogHeader>

          <Input
            className="mb-6 border-2 border-gray-200 focus:border-gray-500 focus:ring-2 focus:ring-gray-300 rounded-lg transition"
            placeholder="Ex. Full Stack Resume"
            value={resumeTitle}
            onChange={(e) => setResumeTitle(e.target.value)}
            disabled={loading}
            aria-label="Resume title input"
            autoFocus
          />

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpenDialog(false)}
              disabled={loading}
              className="border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={onCreate}
              disabled={!resumeTitle.trim() || loading}
              className="bg-gray-900 hover:bg-black text-white font-semibold shadow transition-colors"
            >
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5" aria-label="Loading" />
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;
