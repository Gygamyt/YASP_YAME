import React from 'react';
import { useForm } from 'react-hook-form';
import { Employee } from '@task-tracker/shared/src/types/employee';
import { useAddEmployee } from '../../hooks/useEmployees';
import toast from 'react-hot-toast';

export interface AddEmployeeFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
}

interface FormData {
    name: string;
    position: string;
    department: Employee['department'];
    activeRequests: number;
    interviewLoad: number;
    responseTime: number;
    skills: string;
}

export const AddEmployeeForm: React.FC<AddEmployeeFormProps> = ({
                                                                    onSuccess,
                                                                    onCancel
                                                                }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<FormData>({
        defaultValues: {
            activeRequests: 0,
            interviewLoad: 0,
            responseTime: 1.0,
            skills: ''
        }
    });

    const addEmployeeMutation = useAddEmployee();

    const onSubmit = async (data: FormData) => {
        try {
            const employeeData = {
                ...data,
                skills: data.skills.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0),
                daysSinceLastActivity: 0,
            };

            await addEmployeeMutation.mutateAsync(employeeData);
            toast.success('Сотрудник успешно добавлен!');
            reset();
            onSuccess?.();
        } catch (error) {
            toast.error('Ошибка при добавлении сотрудника');
            console.error('Error adding employee:', error);
        }
    };

    const handleCancel = () => {
        reset();
        onCancel?.();
    };

    return (
        <div className="add-employee-form">
            <div className="form-header">
                <h2>Добавить нового сотрудника</h2>
                <p className="form-description">
                    Заполните информацию о новом сотруднике для добавления в систему отслеживания загрузки
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="employee-form">
                {/* Personal Information Section */}
                <div className="form-section">
                    <h3 className="section-title">Личная информация</h3>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">
                                Имя сотрудника <span className="required">*</span>
                            </label>
                            <input
                                id="name"
                                type="text"
                                {...register('name', {
                                    required: 'Имя обязательно для заполнения',
                                    minLength: {
                                        value: 2,
                                        message: 'Имя должно содержать минимум 2 символа'
                                    }
                                })}
                                className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                                placeholder="Введите полное имя"
                            />
                            {errors.name && (
                                <span className="error-message">{errors.name.message}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="position" className="form-label">
                                Должность <span className="required">*</span>
                            </label>
                            <input
                                id="position"
                                type="text"
                                {...register('position', {
                                    required: 'Должность обязательна для заполнения'
                                })}
                                className={`form-input ${errors.position ? 'form-input--error' : ''}`}
                                placeholder="Например: Senior Developer"
                            />
                            {errors.position && (
                                <span className="error-message">{errors.position.message}</span>
                            )}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="department" className="form-label">
                            Отдел <span className="required">*</span>
                        </label>
                        <select
                            id="department"
                            {...register('department', {
                                required: 'Выберите отдел'
                            })}
                            className={`form-select ${errors.department ? 'form-select--error' : ''}`}
                        >
                            <option value="">Выберите отдел</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Management">Management</option>
                            <option value="HR">HR</option>
                            <option value="Design">Design</option>
                        </select>
                        {errors.department && (
                            <span className="error-message">{errors.department.message}</span>
                        )}
                    </div>
                </div>

                {/* Work Load Section */}
                <div className="form-section">
                    <h3 className="section-title">Параметры загрузки</h3>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="activeRequests" className="form-label">
                                Активные запросы
                            </label>
                            <input
                                id="activeRequests"
                                type="number"
                                min="0"
                                {...register('activeRequests', {
                                    valueAsNumber: true,
                                    min: {
                                        value: 0,
                                        message: 'Значение не может быть отрицательным'
                                    }
                                })}
                                className={`form-input ${errors.activeRequests ? 'form-input--error' : ''}`}
                                placeholder="0"
                            />
                            {errors.activeRequests && (
                                <span className="error-message">{errors.activeRequests.message}</span>
                            )}
                            <span className="form-hint">Количество активных задач в работе</span>
                        </div>

                        <div className="form-group">
                            <label htmlFor="interviewLoad" className="form-label">
                                Нагрузка собеседований
                            </label>
                            <input
                                id="interviewLoad"
                                type="number"
                                min="0"
                                {...register('interviewLoad', {
                                    valueAsNumber: true,
                                    min: {
                                        value: 0,
                                        message: 'Значение не может быть отрицательным'
                                    }
                                })}
                                className={`form-input ${errors.interviewLoad ? 'form-input--error' : ''}`}
                                placeholder="0"
                            />
                            {errors.interviewLoad && (
                                <span className="error-message">{errors.interviewLoad.message}</span>
                            )}
                            <span className="form-hint">Количество запланированных собеседований</span>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="responseTime" className="form-label">
                            Время отклика (дни)
                        </label>
                        <input
                            id="responseTime"
                            type="number"
                            step="0.1"
                            min="0.1"
                            {...register('responseTime', {
                                valueAsNumber: true,
                                min: {
                                    value: 0.1,
                                    message: 'Время отклика должно быть больше 0'
                                }
                            })}
                            className={`form-input ${errors.responseTime ? 'form-input--error' : ''}`}
                            placeholder="1.0"
                        />
                        {errors.responseTime && (
                            <span className="error-message">{errors.responseTime.message}</span>
                        )}
                        <span className="form-hint">Среднее время ответа на запросы в днях</span>
                    </div>
                </div>

                {/* Skills Section */}
                <div className="form-section">
                    <h3 className="section-title">Навыки</h3>

                    <div className="form-group">
                        <label htmlFor="skills" className="form-label">
                            Навыки и технологии
                        </label>
                        <textarea
                            id="skills"
                            {...register('skills')}
                            className="form-textarea"
                            placeholder="React, TypeScript, Node.js, MongoDB (разделяйте запятыми)"
                            rows={3}
                        />
                        <span className="form-hint">
              Перечислите навыки через запятую. Например: React, TypeScript, Node.js
            </span>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="form-actions">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="btn btn--secondary"
                        disabled={isSubmitting}
                    >
                        Отмена
                    </button>
                    <button
                        type="submit"
                        className="btn btn--primary"
                        disabled={isSubmitting || addEmployeeMutation.isPending}
                    >
                        {isSubmitting || addEmployeeMutation.isPending ? (
                            <>
                                <span className="btn-spinner"></span>
                                Добавление...
                            </>
                        ) : (
                            'Добавить сотрудника'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};
