'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Stepper from '@/components/Stepper';
import Toast from '@/components/Toast';

export default function ReportPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    photo: null as File | null,
    latitude: '',
    longitude: '',
    description: '',
  });
  const [isLocating, setIsLocating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      setErrors({ ...errors, photo: '' });
    }
  };

  const handleCaptureLocation = async () => {
    setIsLocating(true);
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      setFormData({
        ...formData,
        latitude: position.coords.latitude.toFixed(6),
        longitude: position.coords.longitude.toFixed(6),
      });
      setErrors({ ...errors, location: '' });
    } catch {
      setErrors({ ...errors, location: 'Failed to get location. Please allow GPS access.' });
    } finally {
      setIsLocating(false);
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !formData.photo) {
      setErrors({ ...errors, photo: 'Photo is required' });
      return;
    }
    if (currentStep === 2 && (!formData.latitude || !formData.longitude)) {
      setErrors({ ...errors, location: 'Location is required' });
      return;
    }
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setToast({ type: 'success', message: 'Report submitted successfully!' });
      setTimeout(() => {
        window.location.href = '/receipt';
      }, 2000);
    } catch {
      setToast({ type: 'error', message: 'Failed to submit report. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background min-h-screen pb-20 md:pb-0">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2">Report an Issue</h1>
          <p className="text-text-secondary">Help us identify and fix civic problems in your neighborhood.</p>
        </div>

        {/* Stepper */}
        <Stepper
          steps={['Photo', 'Location', 'Details', 'Review']}
          currentStep={currentStep}
          onStepClick={setCurrentStep}
        />

        {/* Form Steps */}
        <div className="mt-8 bg-surface rounded-lg border border-border p-6 sm:p-8">
          {/* STEP 1: PHOTO */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-text-primary">Take a Photo</h2>

              {!formData.photo ? (
                <div className="border-2 border-dashed border-border rounded-lg p-8 sm:p-12 text-center hover:border-primary hover:bg-primary-bg transition-colors">
                  <div className="mb-4">
                    <svg className="w-16 h-16 mx-auto text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-2">Choose a photo</h3>
                  <p className="text-text-secondary mb-6">Upload a clear photo of the civic issue</p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <label className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors cursor-pointer min-h-[44px] flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      </svg>
                      Take Photo
                      <input type="file" accept="image/*" capture="environment" onChange={handlePhotoUpload} className="hidden" />
                    </label>

                    <label className="px-6 py-3 bg-surface-alt text-primary border-2 border-primary rounded-lg font-semibold hover:bg-primary-bg transition-colors cursor-pointer min-h-[44px] flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Upload from Gallery
                      <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                    </label>
                  </div>

                  {errors.photo && <p className="text-error text-sm mt-4">{errors.photo}</p>}
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={URL.createObjectURL(formData.photo)}
                    alt="Preview"
                    className="w-full h-80 object-cover rounded-lg border border-border"
                  />
                  <button
                    onClick={() => setFormData({ ...formData, photo: null })}
                    className="absolute top-4 right-4 px-4 py-2 bg-error text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: LOCATION */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-text-primary">Location</h2>

              <button
                onClick={handleCaptureLocation}
                disabled={isLocating}
                className="w-full px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] flex items-center justify-center gap-2"
              >
                {isLocating ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
                      <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Locating...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    Capture My Location
                  </>
                )}
              </button>

              {errors.location && <p className="text-error text-sm">{errors.location}</p>}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">Latitude</label>
                  <input
                    type="text"
                    value={formData.latitude}
                    onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                    placeholder="0.000000"
                    className="w-full px-4 py-2.5 border border-border rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">Longitude</label>
                  <input
                    type="text"
                    value={formData.longitude}
                    onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                    placeholder="0.000000"
                    className="w-full px-4 py-2.5 border border-border rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  />
                </div>
              </div>

              <div className="bg-background rounded-lg border border-border p-6 h-40 flex items-center justify-center text-text-tertiary">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 003 16.382V5.618a1 1 0 011.553-.894L9 7.5m0 0l6.553-3.776A1 1 0 0117 5.618v10.764a1 1 0 01-1.553.894L9 12.5m0 0V20" />
                </svg>
              </div>
            </div>
          )}

          {/* STEP 3: DETAILS */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-text-primary">Details</h2>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Tell us more about this issue..."
                  maxLength={300}
                  rows={6}
                  className="w-full px-4 py-2.5 border border-border rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 resize-none"
                />
                <div className="flex justify-end mt-2">
                  <span className="text-xs text-text-tertiary">
                    {formData.description.length}/300 characters
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-text-primary">Review Your Report</h2>

              <div className="bg-background rounded-lg border border-border p-6 space-y-6">
                {/* Photo Preview */}
                {formData.photo && (
                  <div>
                    <h3 className="font-semibold text-text-primary mb-3">Photo</h3>
                    <img
                      src={URL.createObjectURL(formData.photo)}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Location */}
                <div>
                  <h3 className="font-semibold text-text-primary mb-3">Location</h3>
                  <p className="text-text-secondary">
                    Latitude: <span className="font-mono">{formData.latitude}</span>
                  </p>
                  <p className="text-text-secondary">
                    Longitude: <span className="font-mono">{formData.longitude}</span>
                  </p>
                </div>

                {/* Description */}
                {formData.description && (
                  <div>
                    <h3 className="font-semibold text-text-primary mb-3">Description</h3>
                    <p className="text-text-secondary">{formData.description}</p>
                  </div>
                )}
              </div>

              <p className="text-sm text-text-secondary">
                By submitting, you agree to our terms and that this information can be shared with relevant municipal departments.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mt-8 fixed bottom-0 left-0 right-0 md:relative p-4 md:p-0 bg-surface md:bg-transparent border-t md:border-t-0 border-border md:border-0">
            {currentStep > 1 && (
              <button
                onClick={handlePrevStep}
                className="px-6 py-3 bg-surface-alt text-text-primary border border-border rounded-lg font-semibold hover:bg-background transition-colors min-h-[44px] flex-1 md:flex-none"
              >
                Previous
              </button>
            )}

            {currentStep < 4 ? (
              <button
                onClick={handleNextStep}
                className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors min-h-[44px] flex-1"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-3 bg-success text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 min-h-[44px] flex-1 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
                      <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit Report'
                )}
              </button>
            )}
          </div>
        </div>

        {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      </main>
    </div>
  );
}
