import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';

const getNewEducation = () => ({
  universityName: '',
  degree: '',
  major: '',
  startDate: '',
  endDate: '',
  description: ''
});

function Education() {
  const [educationalList, setEducationalList] = useState([getNewEducation()]);
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();

  useEffect(() => {
    if (resumeInfo?.education && Array.isArray(resumeInfo.education)) {
      setEducationalList(
        resumeInfo.education.length ? resumeInfo.education : [getNewEducation()]
      );
    } else {
      setEducationalList([getNewEducation()]);
    }
  }, [resumeInfo?.education]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedList = [...educationalList];
    updatedList[index][name] = value;
    setEducationalList(updatedList);
    setResumeInfo(prev => ({
      ...prev,
      education: updatedList
    }));
  };

  const AddNewEducation = () => {
    const updatedList = [...educationalList, getNewEducation()];
    setEducationalList(updatedList);
    setResumeInfo(prev => ({
      ...prev,
      education: updatedList
    }));
  };

  const RemoveEducation = () => {
    if (educationalList.length > 1) {
      const updatedList = educationalList.slice(0, -1);
      setEducationalList(updatedList);
      setResumeInfo(prev => ({
        ...prev,
        education: updatedList
      }));
    }
  };

  const prepareEducationPayload = () =>
    educationalList.map(
      ({ universityName, degree, major, startDate, endDate, description }) => ({
        universityName,
        degree,
        major,
        startDate: startDate || null,
        endDate: endDate || null,
        description
      })
    );

  const onSave = async () => {
    setLoading(true);
    const data = {
      data: {
        education: prepareEducationPayload()
      }
    };
    try {
      await GlobalApi.UpdateResumeDetail(params.resumeId, data);
      setResumeInfo({ ...resumeInfo, education: educationalList });
      toast('Details Updated!');
    } catch (error) {
      console.error('Full error:', error);
      if (error?.response?.data?.error) {
        console.error('Strapi message:', error.response.data.error.message);
        if (error.response.data.error.details) {
          console.error('Strapi details:', error.response.data.error.details);
        }
      }
      toast('Server error. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Education</h2>
        <p>Add your Educational details</p>
        <div>
          {educationalList.map((item, index) => (
            <div key={index}>
              <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                <div className='col-span-2'>
                  <label className='text-xs'>University Name</label>
                  <Input
                    name="universityName"
                    value={item.universityName}
                    onChange={e => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className='text-xs'>Degree</label>
                  <Input
                    name="degree"
                    value={item.degree}
                    onChange={e => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className='text-xs'>Major</label>
                  <Input
                    name="major"
                    value={item.major}
                    onChange={e => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className='text-xs'>Start Date</label>
                  <Input
                    type="date"
                    name="startDate"
                    value={item.startDate}
                    onChange={e => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className='text-xs'>End Date</label>
                  <Input
                    type="date"
                    name="endDate"
                    value={item.endDate}
                    onChange={e => handleChange(index, e)}
                  />
                </div>
                <div className='col-span-2'>
                  <label className='text-xs'>Description</label>
                  <Textarea
                    name="description"
                    value={item.description}
                    onChange={e => handleChange(index, e)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-between'>
          <div className='flex gap-2'>
            <Button
              variant="outline"
              onClick={AddNewEducation}
              className='text-primary'
            >
              + Add More Education
            </Button>
            <Button
              variant="outline"
              onClick={RemoveEducation}
              className='text-primary'
              disabled={educationalList.length === 1}
            >
              - Remove
            </Button>
          </div>
          <Button disabled={loading} onClick={onSave}>
            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Education;