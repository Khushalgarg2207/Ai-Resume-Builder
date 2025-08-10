import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../service/GlobalApi'

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState(null)
  const { resumeId } = useParams()

  useEffect(() => {
    const GetResumeInfo = async () => {
      try {
        const resp = await GlobalApi.GetResumeById(resumeId)
        setResumeInfo(resp.data.data)
      } catch (err) {
        console.error('Error fetching resume:', err)
        // Optionally show user-facing error
      }
    }
    GetResumeInfo()
  }, [resumeId])

  const handleDownload = () => {
    window.print()
  }

  const shareData = resumeInfo
    ? {
        text: "Hello Everyone, this is my resume. Open the URL to proceed.",
        url:
          import.meta.env.VITE_BASE_URL +
          "/my-resume/" +
          resumeId +
          "/view",
        title:
          (resumeInfo.firstName || "") +
          " " +
          (resumeInfo.lastName || "") +
          " / resume",
      }
    : null

  const handleWebShare = async () => {
    if (!shareData) return

    if (navigator.share) {
      try {
        await navigator.share(shareData)
        // Optional: show a toast/message for successful share
      } catch (err) {
        if (err.name !== "AbortError") {
          // Only log real errors, ignore abort (user canceled)
          console.error("Share failed:", err)
        }
      }
    } else {
      alert("Sharing is not supported on this browser.")
    }
  }

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />
        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            Congrats! Your Resume is ready
          </h2>
          <p className="text-center text-gray-400">
            Now you can download your resume
          </p>
          <div className="flex justify-between px-44 my-10">
            <Button onClick={handleDownload}>Download</Button>
            <Button onClick={handleWebShare} disabled={!resumeInfo}>
              Share
            </Button>
          </div>
        </div>
      </div>
      <div id="print-area" className="my-10 mx-10 md:mx-20 lg:mx-36">
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume