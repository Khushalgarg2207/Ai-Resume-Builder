import React, { useContext, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { LayoutGrid } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from './../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

function ThemeColor() {
  const colors = [
    "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
    "#33FFA1", "#FF7133", "#71FF33", "#7133FF", "#FF3371",
    "#33FF71", "#3371FF", "#A1FF33", "#33A1FF", "#FF5733",
    "#5733FF", "#33FF5A", "#5A33FF", "#FF335A", "#335AFF"
  ]

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const [selectedColor, setSelectedColor] = useState(resumeInfo?.themeColor || '')
  const { resumeId } = useParams()

  // This function uses PUT and sends ALL required fields!
  const onColorSelect = async (color) => {
    setSelectedColor(color)
    setResumeInfo({
      ...resumeInfo,
      themeColor: color
    })

    // 💡 Build a payload with ALL required fields (adjust as needed)
    const data = {
      data: {
        // Include all fields needed by your Strapi model,
        // below are common ones; adjust if your model is different!
        title: resumeInfo.title,
        userEmail: resumeInfo.userEmail,
        // Add other required fields here:
        // fieldName: resumeInfo.fieldName,
        // etc...
        themeColor: color
      }
    }

    try {
      await GlobalApi.UpdateResumeDetail(resumeId, data)
      toast('Theme Color Updated')
    } catch (err) {
      toast('Error updating theme color')
      console.error(
        'Theme color update error:',
        err?.response?.data?.error || err
      )
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-2">
          <LayoutGrid /> Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <h2 className='mb-2 text-sm font-bold'>Select Theme Color</h2>
        <div className='grid grid-cols-5 gap-3'>
          {colors.map((item, index) => (
            <div
              key={index}
              onClick={() => onColorSelect(item)}
              className={`h-5 w-5 rounded-full cursor-pointer
                hover:border-black border
                ${selectedColor === item ? 'border-2 border-black' : ''}
              `}
              style={{ background: item }}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default ThemeColor