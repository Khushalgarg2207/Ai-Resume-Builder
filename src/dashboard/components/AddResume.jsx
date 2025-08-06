import { Loader2, PlusSquare } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { v4 as uuidv4 } from 'uuid';
import GlobalApi from './../../../service/GlobalApi';
import { useUser } from '@clerk/clerk-react';

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState('');
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  // Handler for creating a new resume
  const onCreate = async () => {
    if (!user) {
      alert('User is not loaded yet. Please try again.');
      return;
    }

    if (!resumeTitle.trim()) {
      alert('Please enter a valid resume title.');
      return;
    }

    if (!user.primaryEmailAddress?.emailAddress || !user.fullName) {
      alert('User email or name is missing.');
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

    console.log('Sending to API:', data);

    try {
      const res = await GlobalApi.CreateNewResume(data);
      console.log('API Response:', res);

      setLoading(false);
      setOpenDialog(false);

      // Use a small timeout so dialog closing animation finishes before reset
      setTimeout(() => setResumeTitle(''), 300);

      alert('Resume created successfully!');
    } catch (error) {
      setLoading(false);

      console.error('Create resume failed:', error);

      if (error.response?.data) {
        alert(`Failed to create resume: ${JSON.stringify(error.response.data)}`);
      } else if (error.message) {
        alert(`Failed to create resume: ${error.message}`);
      } else {
        alert('Failed to create resume. Please try again.');
      }
    }
  };

  return (
    <div>
      <div
        className="p-14 py-24 border-gray-200 items-center flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed"
        onClick={() => setOpenDialog(true)}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') setOpenDialog(true);
        }}
        aria-label="Open create new resume dialog"
      >
        <PlusSquare />
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              Add a title for your new resume
              <Input
                className="my-2"
                placeholder="Ex. Full Stack Resume"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
                disabled={loading}
                aria-label="Resume title input"
              />
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpenDialog(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={onCreate}
                disabled={!resumeTitle.trim() || loading}
              >
                {loading ? <Loader2 className="animate-spin" /> : 'Create'}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;
