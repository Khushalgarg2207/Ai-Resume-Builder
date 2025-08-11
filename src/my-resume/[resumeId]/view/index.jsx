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
      }
    }
    GetResumeInfo()
  }, [resumeId])

  const handleDownload = () => {
    window.print()
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
          <div className="flex flex-col gap-4 items-center px-44 my-10">
            <Button onClick={handleDownload}>Download</Button>
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