import React, { useState } from 'react';
import { SERVICE_CATEGORIES } from '../data/serviceCategories';
import {
  CategoryIcon,
  UploadCloudIcon,
  ArrowRightIcon,
  CheckIcon,
  CloseIcon
} from '../components/ServiceRequestIcons';
import './ServiceRequestStep1.css';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/gif'];

export default function ServiceRequestStep1({ onNextStep, initialData }) {
  const [selectedCategory, setSelectedCategory] = useState(
    initialData?.category || 'ac-repair'
  );
  const [description, setDescription] = useState(
    initialData?.description || ''
  );
  const [photos, setPhotos] = useState(initialData?.photos || []);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (fileList) => {
    setErrorMessage('');
    const validFiles = [];

    Array.from(fileList).forEach((file) => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        setErrorMessage('Unsupported format. Please upload SVG, PNG, JPG, or GIF.');
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setErrorMessage('Each file must be 10MB or smaller.');
        return;
      }
      validFiles.push({
        name: file.name,
        size: file.size,
        previewUrl: URL.createObjectURL(file),
        file
      });
    });

    if (validFiles.length > 0) {
      setPhotos((prev) => [...prev, ...validFiles]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
      e.target.value = '';
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedCategory) {
      setErrorMessage('Please select a service category.');
      return;
    }

    if (!description.trim()) {
      setErrorMessage('Please describe the issue in detail so we can assign the right technician.');
      return;
    }

    setErrorMessage('');
    const step1Payload = {
      category: selectedCategory,
      description: description.trim(),
      photos
    };

    if (typeof onNextStep === 'function') {
      onNextStep(step1Payload);
    } else {
      console.log('Proceeding to Step 2 (Location) with data:', step1Payload);
    }
  };

  return (
    <div className="sr-page-wrapper">
      <div className="sr-container">
        <div className="sr-progress-header">
          <div className="sr-progress-labels">
            <span className="sr-step-text">Step 1 of 3: Service &amp; Description</span>
            <span className="sr-secure-badge">QuickBaas &amp; Secure Booking</span>
          </div>
          <div className="sr-progress-track">
            <div className="sr-progress-fill" />
          </div>
        </div>

        <form className="sr-card" onSubmit={handleSubmit} noValidate>
          <div className="sr-card-header">
            <h1>What needs fixing today?</h1>
            <p>
              Select a service category and tell us a bit about the issue so we
              can assign the best verified technician.
            </p>
          </div>

          <div className="sr-section">
            <label className="sr-label">Select Category</label>
            <div className="sr-category-grid">
              {SERVICE_CATEGORIES.map((item) => {
                const isSelected = selectedCategory === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`sr-category-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedCategory(item.id);
                      setErrorMessage('');
                    }}
                    aria-pressed={isSelected}
                  >
                    <div className="sr-category-top">
                      <span className="sr-category-icon">
                        <CategoryIcon type={item.iconType} />
                      </span>
                      <span className={`sr-radio-indicator ${isSelected ? 'checked' : ''}`}>
                        {isSelected && <span className="sr-radio-dot" />}
                      </span>
                    </div>

                    <div className="sr-category-title">{item.title}</div>
                    <div className="sr-category-desc">{item.description}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="sr-section">
            <label htmlFor="issue-description" className="sr-label">
              Describe the issue in detail
            </label>
            <textarea
              id="issue-description"
              className="sr-textarea"
              rows={4}
              placeholder="E.g., Living room AC is blowing warm air and making a rattling noise when turned on..."
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
            />
          </div>

          <div className="sr-section">
            <label className="sr-label">Upload Photos (Optional)</label>
            <label
              htmlFor="issue-photo-upload"
              className={`sr-dropzone ${isDragging ? 'dragging' : ''}`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <span className="sr-upload-icon">
                <UploadCloudIcon />
              </span>
              <span className="sr-upload-main-text">
                Click to upload or drag and drop
              </span>
              <span className="sr-upload-sub-text">
                SVG, PNG, JPG or GIF (max. 10MB)
              </span>
              <input
                id="issue-photo-upload"
                type="file"
                multiple
                accept=".svg,.png,.jpg,.jpeg,.gif"
                onChange={handleFileChange}
                hidden
              />
            </label>

            {photos.length > 0 && (
              <div className="sr-photo-list">
                {photos.map((photo, index) => (
                  <div key={`${photo.name}-${index}`} className="sr-photo-chip">
                    <span className="sr-photo-check">
                      <CheckIcon />
                    </span>
                    <span className="sr-photo-name">{photo.name}</span>
                    <button
                      type="button"
                      className="sr-photo-remove"
                      onClick={() => handleRemovePhoto(index)}
                      aria-label={`Remove ${photo.name}`}
                    >
                      <CloseIcon />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {errorMessage && (
            <div className="sr-error-banner" role="alert">
              {errorMessage}
            </div>
          )}

          <div className="sr-card-footer">
            <button type="submit" className="sr-primary-btn">
              <span>Continue to Location</span>
              <ArrowRightIcon />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}