import { MoreVertical, Loader2Icon } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import GlobalApi from './../../../service/GlobalApi'
import { toast } from 'sonner'

function ResumeCardItem({ resume, refreshData }) {
  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = () => {
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.documentId).then(resp => {
      toast('Resume Deleted!');
      refreshData();
      setLoading(false);
      setOpenAlert(false);
    }, () => {
      setLoading(false);
    });
  };

  return (
    <div className="
      rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-[1.03] 
      transition-all duration-200 border border-gray-200
      bg-white
    ">
      <Link to={`/dashboard/resume/${resume.documentId}/edit`} tabIndex={0}>
        <div className="
          flex items-center justify-center border-b-2 border-dashed border-gray-300
          rounded-t-2xl h-[230px] w-full relative bg-gradient-to-br from-pink-200 via-purple-300 to-blue-300
          cursor-pointer outline-none focus:ring-2 focus:ring-purple-300
          transition-all
        ">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="absolute w-20 h-20 bg-pink-200 opacity-40 rounded-full blur-lg"></span>
            <img src='/cv.png' className="relative z-10 w-14 h-14 text-white drop-shadow-lg"/>
          </div>
        </div>
      </Link>

      <div
        className="
          flex items-center justify-between px-5 py-4
          text-white rounded-b-2xl
        "
        style={{
          background: resume?.themeColor || "#7742E1"
        }}
      >
        <div className="flex flex-col min-w-0">
          <span className="text-base font-bold truncate max-w-[120px]">
            {resume.title || resume.Title}
          </span>
          {resume.role &&
            <span className="text-xs opacity-80 truncate max-w-[120px]">{resume.role}</span>
          }
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label="More actions"
              className="transition-colors rounded-full hover:bg-white/20 p-1"
            >
              <MoreVertical className="h-6 w-6 cursor-pointer" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => navigation(`/dashboard/resume/${resume.documentId}/edit`)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigation(`/my-resume/${resume.documentId}/view`)}>View</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigation(`/my-resume/${resume.documentId}/view`)}>Download</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your resume and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading}>
                {loading ? <Loader2Icon className="animate-spin" /> : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default ResumeCardItem;