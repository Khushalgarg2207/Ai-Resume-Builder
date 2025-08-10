import React from 'react'

function SkillPreview({ resumeInfo }) {
  return (
    <div className='my-6'>
      <h2
        className='text-center font-bold text-sm mb-2'
        style={{
          color: resumeInfo?.themeColor
        }}
      >
        Skills
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />
      <div className='grid grid-cols-2 gap-3 my-4'>
        {resumeInfo?.skills?.map((skill, index) => (
          <div
            key={index}
            className='flex items-center gap-x-8'
          >
            <span className='text-xs w-24 truncate'>{skill.name}</span>
            <div className='bg-gray-200 h-2 w-[180px] rounded relative overflow-hidden'>
              <div
                className='h-2 rounded'
                style={{
                  backgroundColor: resumeInfo?.themeColor,
                  width: Math.max(2, Math.min(skill?.rating * 20, 100)) + '%',
                  transition: 'width .3s'
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkillPreview