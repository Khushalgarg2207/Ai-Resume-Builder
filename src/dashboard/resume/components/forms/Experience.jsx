import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react';
import RIchTextEditor from '../RIchTextEditor';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi'
import { LoaderCircle } from 'lucide-react';

const getNewFormField = () => ({
  title: '',
  companyName: '',
  city: '',
  state: '',
  startDate: '',
  endDate: '',
  workSummary: ''
});

function Experience() {
  const [experienceList, setExperienceList] = useState([getNewFormField()]);
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();

  useEffect(() => {
    if (resumeInfo?.experience) {
      setExperienceList(resumeInfo.experience);
    }
  }, []); // Empty array = run once on mount

  // Every time experienceList changes, update context
  useEffect(() => {
    setResumeInfo({ ...resumeInfo, experience: experienceList });
    // eslint-disable-next-line
  }, [experienceList]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    setExperienceList(prev => {
      const result = prev.slice();
      result[index][name] = value;
      return result;
    });
  };

  const AddNewExperience = () => {
    setExperienceList(prev => [...prev, getNewFormField()]);
  };

  const RemoveExperience = () => {
    setExperienceList(prev => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const handleRichTextEditor = (e, name, index) => {
    setExperienceList(prev => {
      const result = prev.slice();
      result[index][name] = e.target.value;
      return result;
    });
  };

  const prepareExperiencePayload = () =>
    experienceList.map(
      ({ id, _id, title, companyName, city, state, startDate, endDate, workSummary }) => ({
        title,
        companyName,
        city,
        state,
        startDate: startDate || null,
        endDate: endDate || null,
        workSummary
      })
    );

  const onSave = async () => {
    setLoading(true);
    const data = {
      data: {
        experience: prepareExperiencePayload()
      }
    };

    try {
      await GlobalApi.UpdateResumeDetail(params?.resumeId, data);
      toast('Details updated!');
    } catch (err) {
      console.error('Full error object:', err);
      if (err?.response?.data?.error) {
        console.error('Strapi message:', err.response.data.error.message);
        if (err.response.data.error.details) {
          console.error('Strapi details:', err.response.data.error.details);
        }
      }
      toast('Error updating details!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Personal Experience</h2>
        <p>Add your previous job experience</p>
        <div>
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                <div>
                  <label className='text-xs'>Position Title</label>
                  <Input
                    name="title"
                    value={item.title}
                    onChange={e => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className='text-xs'>Company Name</label>
                  <Input
                    name="companyName"
                    value={item.companyName}
                    onChange={e => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className='text-xs'>City</label>
                  <Input
                    name="city"
                    value={item.city}
                    onChange={e => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label className='text-xs'>State</label>
                  <Input
                    name="state"
                    value={item.state}
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
                  <RIchTextEditor
                    index={index}
                    value={item.workSummary}
                    onRichTextEditorChange={e => handleRichTextEditor(e, 'workSummary', index)}
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
              onClick={AddNewExperience}
              className='text-primary'
            >
              + Add More Experience
            </Button>
            <Button
              variant="outline"
              onClick={RemoveExperience}
              className='text-primary'
              disabled={experienceList.length === 1}
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

export default Experience;
