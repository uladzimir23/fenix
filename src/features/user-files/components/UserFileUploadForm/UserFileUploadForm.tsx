// src/features/user-files/components/UserFileUploadForm/UserFileUploadForm.tsx
import React, { useState } from 'react';
import { UploadUserFileData, UserFile } from '@/shared/api/types/user-file';
import { getUserFileCategories, TuningCategory } from '@/shared/lib/data/tuning-options'; // Изменили импорт
import styles from './UserFileUploadForm.module.scss';

interface UserFileUploadFormProps {
  onSuccess: (file: UserFile) => void;
  onCancel: () => void;
}

export const UserFileUploadForm: React.FC<UserFileUploadFormProps> = ({ 
  onSuccess, 
  onCancel 
}) => {
  const [formData, setFormData] = useState<UploadUserFileData>({
    name: '',
    description: '',
    file: null as unknown as File,
    category: 'Stage1' as TuningCategory,
    brand: '',
    model: '',
    engine: '',
    version: '1.0',
    fuelType: 'Бензин',
    originalHorsepower: undefined,
    tunedHorsepower: undefined,
    originalTorque: undefined,
    tunedTorque: undefined,
    fuelConsumptionChange: '',
    requiredHardware: [],
    compatibilityNotes: '',
    changelog: '',
    supportedECUs: [],
    supportedYears: '',
    transmissionType: '',
    isEncrypted: false,
    requiresUnlockCode: false,
    recommendedTuningTools: [],
    knownIssues: '',
    installationInstructions: '',
    testedVehicles: [],
    author: '',
    isPublic: true
  });

  const [supportedECUInput, setSupportedECUInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories = getUserFileCategories(); // Вместо getCategories()  
  const fuelTypes = ['Бензин', 'Дизель', 'Бензин/E85', 'Гибрид', 'Газ/Бензин'];
  const transmissionTypes = ['Механическая', 'Автоматическая', 'CVT', 'DSG/S-Tronic'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: value ? Number(value) : undefined }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const addECU = () => {
    if (supportedECUInput.trim() && !formData.supportedECUs.includes(supportedECUInput.trim())) {
      setFormData(prev => ({
        ...prev,
        supportedECUs: [...prev.supportedECUs, supportedECUInput.trim()]
      }));
      setSupportedECUInput('');
    }
  };

  const removeECU = (index: number) => {
    setFormData(prev => ({
      ...prev,
      supportedECUs: prev.supportedECUs.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Валидация
    if (!formData.file) {
      setError('Пожалуйста, выберите файл прошивки');
      return;
    }
    
    if (formData.file.size > 10 * 1024 * 1024) {
      setError('Размер файла не должен превышать 10MB');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Имитация успешной загрузки
      setTimeout(() => {
        const newFile: UserFile = {
          id: Math.floor(Math.random() * 1000),
          ...formData,
          fileName: formData.file.name, // Добавляем недостающее поле fileName
          uploadDate: new Date(),
          fileSize: Math.round(formData.file.size / 1024 / 1024 * 100) / 100,
          downloadCount: 0,
          rating: 0,
          status: 'pending',
          horsepowerGain: formData.tunedHorsepower && formData.originalHorsepower 
            ? formData.tunedHorsepower - formData.originalHorsepower 
            : undefined,
          torqueGain: formData.tunedTorque && formData.originalTorque 
            ? formData.tunedTorque - formData.originalTorque 
            : undefined,
        };
        
        onSuccess(newFile);
        setIsSubmitting(false);
      }, 1000);
    } catch (err) {
      setError('Ошибка при загрузке файла');
      setIsSubmitting(false);
      console.error('Error uploading file:', err);
    }
  };

  return (
    <div className={styles.userFileUploadForm}>
      <h2>Загрузка нового файла</h2>
      
      {error && <div className={styles.errorMessage}>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className={styles.formSection}>
          <h3>Основная информация</h3>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Название файла *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="version">Версия *</label>
              <input
                type="text"
                id="version"
                name="version"
                value={formData.version}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="description">Описание *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              required
            />
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="brand">Марка автомобиля *</label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="model">Модель *</label>
              <input
                type="text"
                id="model"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="engine">Двигатель *</label>
              <input
                type="text"
                id="engine"
                name="engine"
                value={formData.engine}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="category">Категория *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className={styles.formSection}>
          <h3>Файл прошивки</h3>
          
          <div className={styles.formGroup}>
            <label htmlFor="file">Файл прошивки *</label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              accept=".bin,.hex,.mot,.s19"
              required
            />
            <div className={styles.fileInfo}>
              {formData.file ? formData.file.name : 'Файл не выбран'}
            </div>
          </div>
        </div>

        <div className={styles.formActions}>
          <button
            type="button"
            onClick={onCancel}
            className={styles.cancelButton}
            disabled={isSubmitting}
          >
            Отмена
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Загрузка...' : 'Загрузить файл'}
          </button>
        </div>
      </form>
    </div>
  );
};