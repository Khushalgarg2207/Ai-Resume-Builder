import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'

const FORM_FIELDS = [
  'firstName',
  'lastName',
  'jobTitle',
  'address',
  'phone',
  'email',
]

function PersonalDetail({ enabledNext }) {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const getInitialFormData = (info) =>
    FORM_FIELDS.reduce(
      (acc, key) => ({ ...acc, [key]: info?.[key] || "" }),
      {}
    );

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(getInitialFormData(resumeInfo));

  useEffect(() => {
    setFormData(getInitialFormData(resumeInfo));
  }, [resumeInfo]);

  const handleInputChange = (e) => {
    enabledNext(false);
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setResumeInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const cleanedData = FORM_FIELDS.reduce(
      (acc, key) => ({ ...acc, [key]: formData[key] }),
      {}
    );

    const data = { data: cleanedData };

    try {
      await GlobalApi.UpdateResumeDetail(params?.resumeId, data);
      enabledNext(true);
      setLoading(false);
      toast("Details Updated");
    } catch (error) {
      setLoading(false);
      toast("Failed to update details.");
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Details</h2>
      <p>Get started with the basic information</p>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label htmlFor="firstName" className="text-sm">
              First Name
            </label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="text-sm">
              Last Name
            </label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="jobTitle" className="text-sm">
              Job Title
            </label>
            <Input
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="address" className="text-sm">
              Address
            </label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="phone" className="text-sm">
              Phone
            </label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <Input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={loading} className="flex items-center gap-2">
            {loading && <LoaderCircle className="animate-spin" />}
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetail;