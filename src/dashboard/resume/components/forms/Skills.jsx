import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from './../../../../../service/GlobalApi';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const getNewSkill = () => ({
  name: '',
  rating: 0
});

function Skills() {
  const [skillsList, setSkillsList] = useState([getNewSkill()]);
  const { resumeId } = useParams();
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  useEffect(() => {
    if (resumeInfo?.skills && Array.isArray(resumeInfo.skills)) {
      setSkillsList(
        resumeInfo.skills.length ? resumeInfo.skills : [getNewSkill()]
      );
    } else {
      setSkillsList([getNewSkill()]);
    }
  }, [resumeInfo?.skills]);

  const handleChange = (index, name, value) => {
    const result = [...skillsList];
    result[index][name] = value;
    setSkillsList(result);
    setResumeInfo(prev => ({
      ...prev,
      skills: result
    }));
  };

  const AddNewSkills = () => {
    const result = [...skillsList, getNewSkill()];
    setSkillsList(result);
    setResumeInfo(prev => ({
      ...prev,
      skills: result
    }));
  };

  const RemoveSkills = () => {
    if (skillsList.length > 1) {
      const result = skillsList.slice(0, -1);
      setSkillsList(result);
      setResumeInfo(prev => ({
        ...prev,
        skills: result
      }));
    }
  };

  const prepareSkillsPayload = () =>
    skillsList.map(({ name, rating }) => ({
      name,
      rating
    }));

  const onSave = async () => {
    setLoading(true);
    const data = {
      data: {
        skills: prepareSkillsPayload()
      }
    };
    try {
      await GlobalApi.UpdateResumeDetail(resumeId, data);
      setResumeInfo({ ...resumeInfo, skills: skillsList });
      toast('Details updated!');
    } catch (error) {
      console.error('Full error:', error);
      if (error?.response?.data?.error) {
        console.error('Strapi message:', error.response.data.error.message);
        if (error.response.data.error.details) {
          console.error('Strapi details:', error.response.data.error.details);
        }
      }
      toast('Server Error, Try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Skills</h2>
      <p>Add your top professional key skills</p>
      <div>
        {skillsList.map((item, index) => (
          <div key={index}>
            <div className='flex items-center gap-x-6 mb-2 border rounded-lg p-3'>
              <div>
                <label className='text-xs'>Name</label>
                <Input
                  className="w-full"
                  value={item.name}
                  onChange={e => handleChange(index, 'name', e.target.value)}
                />
              </div>
              <Rating
                style={{ maxWidth: 120 }}
                value={item.rating}
                onChange={v => handleChange(index, 'rating', v)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <Button variant="outline" onClick={AddNewSkills} className="text-primary">
            + Add More Skill
          </Button>
          <Button
            variant="outline"
            onClick={RemoveSkills}
            className="text-primary"
            disabled={skillsList.length === 1}
          >
            - Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
        </Button>
      </div>
    </div>
  );
}

export default Skills;