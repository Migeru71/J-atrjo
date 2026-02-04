// client/src/components/Games/Memorama/ConfiguracionActividadView.js
// Vista de configuración de actividades con estilo EduCreator Studio
// Incluye: Word Pairs mode, Quiz mode, creación de categorías, upload de media
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ActivityService from '../../../services/ActivityService';
import ExperienceService from '../../../services/ExperienceService';
import mockGames from '../../../data/mockGames';
import mockQuiz from '../../../data/mockQuiz';
import './Memorama.css';

const ConfiguracionActividadView = ({ onActivityCreated }) => {
    const navigate = useNavigate();
    const { editId } = useParams();
    const imageInputRef = useRef(null);
    const audioInputRef = useRef(null);

    // Estado del formulario principal
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        difficulty: 'medio',
        categoryId: '',
        mediaType: 'Imagen',
        language: 'ESP'
    });

    // Estado para word pairs (Word Pairs mode)
    const [wordPairs, setWordPairs] = useState([
        { id: 1, stimulus: '', response: '', stimulusLang: 'ESP', responseLang: 'MAZ', image: null, audio: null, isComplete: false }
    ]);

    // Estado para quiz questions (Quiz mode)
    const [quizQuestions, setQuizQuestions] = useState([
        {
            id: 1,
            question: '',
            questionLang: 'ESP',
            image: null,
            audio: null,
            answerFormat: 'text',
            answerLang: 'ESP',
            options: [
                { id: 1, text: '', isCorrect: true },
                { id: 2, text: '', isCorrect: false },
                { id: 3, text: '', isCorrect: false },
                { id: 4, text: '', isCorrect: false }
            ]
        }
    ]);

    // Estado del modo de actividad
    const [activityMode, setActivityMode] = useState('wordPairs');

    // Estado para nueva categoría
    const [showNewCategory, setShowNewCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');

    // Estado para media upload activo
    const [activeMediaUpload, setActiveMediaUpload] = useState({ type: null, itemId: null, field: null });

    const [categories, setCategories] = useState([]);
    const [recommendedXP, setRecommendedXP] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [difficultyLevel, setDifficultyLevel] = useState(3);

    useEffect(() => {
        setCategories(mockGames.getAllCategories());

        // Cargar datos si estamos en modo edición
        if (editId) {
            loadActivityForEdit(editId);
        }
    }, [editId]);

    const loadActivityForEdit = (id) => {
        setLoading(true);
        // Intentar encontrar en mockGames (Memorama)
        const memoramaActivity = mockGames.getActivity(parseInt(id));

        if (memoramaActivity) {
            console.log('✏️ Editando Memorama:', memoramaActivity.name);
            setActivityMode('wordPairs');
            setFormData({
                name: memoramaActivity.name,
                description: memoramaActivity.description || '',
                difficulty: memoramaActivity.difficulty,
                categoryId: memoramaActivity.categoryId,
                mediaType: 'Imagen', // Default
                language: 'ESP'
            });

            // Map pairs to component structure
            if (memoramaActivity.pairs) {
                setWordPairs(memoramaActivity.pairs.map(p => ({
                    id: p.id,
                    stimulus: p.spanish,
                    response: p.mazahua,
                    stimulusLang: 'ESP',
                    responseLang: 'MAZ',
                    image: p.image,
                    audio: p.audio,
                    isComplete: true
                })));
            }
            setLoading(false);
            return;
        }

        // Intentar encontrar en mockQuiz (Quiz)
        const quizActivity = mockQuiz.getActivity(parseInt(id));
        if (quizActivity) {
            console.log('✏️ Editando Quiz:', quizActivity.name);
            setActivityMode('quiz');
            setFormData({
                name: quizActivity.name,
                description: quizActivity.description || '',
                difficulty: quizActivity.difficulty,
                categoryId: quizActivity.categoryId,
                mediaType: 'Imagen',
                language: 'ESP'
            });

            if (quizActivity.questions) {
                setQuizQuestions(quizActivity.questions.map(q => ({
                    ...q,
                    // Asegurar estructura
                    options: q.options || []
                })));
            }
            setLoading(false);
            return;
        }

        setError('Actividad no encontrada');
        setLoading(false);
    };

    useEffect(() => {
        const calculateXP = async () => {
            if (formData.difficulty && formData.mediaType) {
                const xp = await ExperienceService.calculateRecommendedXP(
                    formData.difficulty,
                    formData.mediaType
                );
                setRecommendedXP(xp);
            }
        };
        calculateXP();
    }, [formData.difficulty, formData.mediaType]);

    useEffect(() => {
        const difficultyMap = { 1: 'fácil', 2: 'fácil', 3: 'medio', 4: 'difícil', 5: 'difícil' };
        setFormData(prev => ({ ...prev, difficulty: difficultyMap[difficultyLevel] }));
    }, [difficultyLevel]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'categoryId' && value === 'new') {
            setShowNewCategory(true);
            setFormData(prev => ({ ...prev, categoryId: '' }));
        } else {
            setShowNewCategory(false);
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    // ========== WORD PAIRS HANDLERS ==========
    const handleWordPairChange = (id, field, value) => {
        setWordPairs(prev => prev.map(pair =>
            pair.id === id ? { ...pair, [field]: value } : pair
        ));
    };

    const addWordPair = () => {
        const newId = Math.max(...wordPairs.map(p => p.id), 0) + 1;
        setWordPairs(prev => [...prev, {
            id: newId, stimulus: '', response: '', stimulusLang: 'ESP', responseLang: 'MAZ',
            image: null, audio: null, isComplete: false
        }]);
    };

    const removeWordPair = (id) => {
        if (wordPairs.length > 1) {
            setWordPairs(prev => prev.filter(pair => pair.id !== id));
        }
    };

    // ========== QUIZ HANDLERS ==========
    const handleQuizQuestionChange = (questionId, field, value) => {
        setQuizQuestions(prev => prev.map(q =>
            q.id === questionId ? { ...q, [field]: value } : q
        ));
    };

    const handleQuizOptionChange = (questionId, optionId, field, value) => {
        setQuizQuestions(prev => prev.map(q => {
            if (q.id === questionId) {
                const updatedOptions = q.options.map(opt => {
                    if (opt.id === optionId) {
                        return { ...opt, [field]: value };
                    }
                    // Si marcamos una opción como correcta, desmarcamos las demás
                    if (field === 'isCorrect' && value === true && opt.id !== optionId) {
                        return { ...opt, isCorrect: false };
                    }
                    return opt;
                });
                return { ...q, options: updatedOptions };
            }
            return q;
        }));
    };

    const addQuizQuestion = () => {
        const newId = Math.max(...quizQuestions.map(q => q.id), 0) + 1;
        setQuizQuestions(prev => [...prev, {
            id: newId, question: '', questionLang: 'ESP', image: null, audio: null,
            answerFormat: 'text', answerLang: 'ESP',
            options: [
                { id: 1, text: '', isCorrect: true },
                { id: 2, text: '', isCorrect: false },
                { id: 3, text: '', isCorrect: false },
                { id: 4, text: '', isCorrect: false }
            ]
        }]);
    };

    const removeQuizQuestion = (id) => {
        if (quizQuestions.length > 1) {
            setQuizQuestions(prev => prev.filter(q => q.id !== id));
        }
    };

    // ========== MEDIA HANDLERS ==========
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const base64 = await mockGames.fileToBase64(file);
            const mediaId = mockGames.saveImage(base64);

            if (activeMediaUpload.type === 'wordPair') {
                setWordPairs(prev => prev.map(p =>
                    p.id === activeMediaUpload.itemId ? { ...p, image: base64 } : p
                ));
            } else if (activeMediaUpload.type === 'quiz') {
                setQuizQuestions(prev => prev.map(q =>
                    q.id === activeMediaUpload.itemId ? { ...q, image: base64 } : q
                ));
            }
        } catch (err) {
            console.error('Error uploading image:', err);
        }
        setActiveMediaUpload({ type: null, itemId: null, field: null });
    };

    const handleAudioUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const base64 = await mockGames.fileToBase64(file);
            mockGames.saveAudio(base64);

            if (activeMediaUpload.type === 'wordPair') {
                setWordPairs(prev => prev.map(p =>
                    p.id === activeMediaUpload.itemId ? { ...p, audio: base64 } : p
                ));
            } else if (activeMediaUpload.type === 'quiz') {
                setQuizQuestions(prev => prev.map(q =>
                    q.id === activeMediaUpload.itemId ? { ...q, audio: base64 } : q
                ));
            }
        } catch (err) {
            console.error('Error uploading audio:', err);
        }
        setActiveMediaUpload({ type: null, itemId: null, field: null });
    };

    const triggerImageUpload = (type, itemId) => {
        setActiveMediaUpload({ type, itemId, field: 'image' });
        imageInputRef.current?.click();
    };

    const triggerAudioUpload = (type, itemId) => {
        setActiveMediaUpload({ type, itemId, field: 'audio' });
        audioInputRef.current?.click();
    };

    const removeMedia = (type, itemId, field) => {
        if (type === 'wordPair') {
            setWordPairs(prev => prev.map(p =>
                p.id === itemId ? { ...p, [field]: null } : p
            ));
        } else if (type === 'quiz') {
            setQuizQuestions(prev => prev.map(q =>
                q.id === itemId ? { ...q, [field]: null } : q
            ));
        }
    };

    // ========== SUBMIT ==========
    const handleSubmit = async () => {
        setError(null);
        setSuccess(null);
        setLoading(true);

        try {
            let result;

            // Crear o Actualizar
            const isEdit = !!editId;
            const targetId = isEdit ? parseInt(editId) : null;

            // QUIZ MODE - Usar mockQuiz con su propia validación
            if (activityMode === 'quiz') {
                const quizData = {
                    name: formData.name,
                    description: formData.description,
                    difficulty: formData.difficulty,
                    recommendedXP,
                    questions: quizQuestions.map(q => ({
                        ...q,
                        options: q.options.filter(o => o.text.trim())
                    }))
                };

                // Validar con mockQuiz
                const validation = mockQuiz.validateQuizActivity(quizData);
                if (!validation.isValid) {
                    setError(validation.errors.join('. '));
                    setLoading(false);
                    return;
                }

                // Guardar/Actualizar quiz
                if (isEdit) {
                    result = mockQuiz.updateActivity(targetId, quizData);
                } else {
                    if (showNewCategory && newCategoryName.trim()) {
                        result = mockQuiz.createActivityWithCategory(quizData, newCategoryName.trim());
                    } else {
                        result = mockQuiz.createActivity(quizData);
                    }
                }

                if (result.success === false) {
                    setError(result.errors?.join('. ') || result.error || 'Error al guardar quiz');
                    setLoading(false);
                    return;
                }

                setSuccess(isEdit ? '✅ Quiz actualizado exitosamente' : '✅ Quiz creado exitosamente');
                if (onActivityCreated) {
                    onActivityCreated(result.activity);
                }
                setTimeout(() => {
                    setSuccess(null);
                    // Regresar al panel correspondiente
                    navigate(isEdit ? '/games/quiz' : '/games/memorama');
                }, 2000);

            } else {
                // WORD PAIRS MODE - Usar mockGames/ActivityService

                // Mapear wordPairs al formato de almacenamiento
                // (Nota: ActivityService espera pairs en un formato, mockGames en otro si es local)
                // Para simplificar y dado que mockGames.createActivityWithCategory maneja pairs internamente:

                const activityData = {
                    name: formData.name,
                    description: formData.description,
                    difficulty: formData.difficulty,
                    activityMode: activityMode,
                    recommendedXP,
                    wordPairs: wordPairs.filter(p => p.stimulus && p.response)
                };

                if (isEdit) {
                    // Actualizar en mockGames (asumimos que todas están en mocks para este demo)
                    // Para actualizar pares, necesitamos mapearlos al formato que mockGames espera si updateActivity no lo hace
                    // mockGames updateActivity hace un merge simple. Deberíamos actualizar los pares explícitamente.

                    const updatedPairs = activityData.wordPairs.map((wp, index) => ({
                        id: index + 1,
                        spanish: wp.stimulus,
                        mazahua: wp.response,
                        image: wp.image || null,
                        audio: wp.audio || null
                    }));

                    result = mockGames.updateActivity(targetId, {
                        ...activityData,
                        pairs: updatedPairs
                    });

                } else {
                    if (showNewCategory && newCategoryName.trim()) {
                        result = mockGames.createActivityWithCategory(activityData, newCategoryName.trim());
                        setCategories(mockGames.getAllCategories());
                    } else {
                        // Usamos ActivityService para crear
                        const response = await ActivityService.createActivity({
                            ...formData,
                            activityMode,
                            recommendedXP,
                            wordPairs: activityData.wordPairs,
                        });

                        if (!response.success) {
                            setError(response.error);
                            setLoading(false);
                            return;
                        }
                        result = response;
                    }
                }

                if (result.success === false && result.error) {
                    setError(result.error);
                    setLoading(false);
                    return;
                }

                setSuccess(isEdit ? '✅ Actividad actualizada exitosamente' : '✅ Actividad creada exitosamente');
                if (onActivityCreated) {
                    onActivityCreated(result.activity);
                }
                setTimeout(() => {
                    setSuccess(null);
                    navigate(isEdit ? '/games/memorama' : '/games/memorama');
                }, 2000);
            }
        } catch (err) {
            setError(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => navigate('/games/memorama');

    const getItemCount = () => {
        if (activityMode === 'wordPairs') {
            return wordPairs.filter(p => p.stimulus && p.response).length;
        }
        return quizQuestions.filter(q => q.question && q.options.some(o => o.text)).length;
    };

    // ========== RENDER WORD PAIRS MODE ==========
    const renderWordPairsContent = () => {
        return React.createElement('div', { className: 'word-pair-list' },
            wordPairs.map((pair, index) =>
                React.createElement('div', {
                    key: pair.id,
                    className: `word-pair-card ${(!pair.stimulus || !pair.response) ? 'incomplete' : ''}`
                },
                    React.createElement('div', { className: 'word-pair-header' },
                        React.createElement('div', { className: 'word-pair-header-left' },
                            React.createElement('span', { className: 'word-pair-number' }, index + 1),
                            React.createElement('h3', { className: 'word-pair-title' },
                                pair.stimulus ? `Par: "${pair.stimulus}"` : 'Nuevo Elemento'
                            )
                        ),
                        React.createElement('div', { className: 'word-pair-header-right' },
                            (!pair.stimulus || !pair.response) &&
                            React.createElement('span', { className: 'word-pair-status' }, 'Incompleto'),
                            React.createElement('button', {
                                className: 'word-pair-action delete',
                                onClick: () => removeWordPair(pair.id)
                            }, '🗑️')
                        )
                    ),
                    React.createElement('div', { className: 'word-pair-content' },
                        React.createElement('div', { className: 'word-pair-divider' }),
                        // Estímulo
                        React.createElement('div', { className: 'word-pair-side' },
                            React.createElement('div', { className: 'word-pair-side-header' },
                                React.createElement('span', { className: 'word-pair-side-label' }, 'Estímulo'),
                                React.createElement('select', {
                                    className: 'word-pair-lang-select',
                                    value: pair.stimulusLang,
                                    onChange: (e) => handleWordPairChange(pair.id, 'stimulusLang', e.target.value)
                                },
                                    React.createElement('option', { value: 'ESP' }, 'ESP'),
                                    React.createElement('option', { value: 'MAZ' }, 'MAZ')
                                )
                            ),
                            React.createElement('input', {
                                type: 'text', className: 'word-pair-input',
                                placeholder: 'Escribe la palabra...',
                                value: pair.stimulus,
                                onChange: (e) => handleWordPairChange(pair.id, 'stimulus', e.target.value)
                            }),
                            React.createElement('div', { className: 'word-pair-media' },
                                pair.image ?
                                    React.createElement('div', { className: 'media-preview' },
                                        React.createElement('img', { src: pair.image, alt: 'preview' }),
                                        React.createElement('button', {
                                            className: 'media-preview-remove',
                                            onClick: () => removeMedia('wordPair', pair.id, 'image')
                                        }, '×')
                                    ) :
                                    React.createElement('button', {
                                        className: 'media-btn',
                                        onClick: () => triggerImageUpload('wordPair', pair.id)
                                    },
                                        React.createElement('span', { className: 'media-btn-icon' }, '🖼️'),
                                        React.createElement('span', { className: 'media-btn-label' }, 'Imagen')
                                    ),
                                React.createElement('button', {
                                    className: 'media-btn',
                                    onClick: () => triggerAudioUpload('wordPair', pair.id)
                                },
                                    React.createElement('span', { className: 'media-btn-icon' }, '🎤'),
                                    React.createElement('span', { className: 'media-btn-label' }, pair.audio ? '✓' : 'Audio')
                                )
                            )
                        ),
                        // Respuesta
                        React.createElement('div', { className: 'word-pair-side' },
                            React.createElement('div', { className: 'word-pair-side-header' },
                                React.createElement('span', { className: 'word-pair-side-label' }, 'Respuesta'),
                                React.createElement('select', {
                                    className: 'word-pair-lang-select',
                                    value: pair.responseLang,
                                    onChange: (e) => handleWordPairChange(pair.id, 'responseLang', e.target.value)
                                },
                                    React.createElement('option', { value: 'MAZ' }, 'MAZ'),
                                    React.createElement('option', { value: 'ESP' }, 'ESP')
                                )
                            ),
                            React.createElement('input', {
                                type: 'text', className: `word-pair-input ${pair.response ? 'correct' : ''}`,
                                placeholder: 'Respuesta correcta...',
                                value: pair.response,
                                onChange: (e) => handleWordPairChange(pair.id, 'response', e.target.value)
                            }),
                            pair.response && React.createElement('div', { className: 'audio-player' },
                                React.createElement('span', { className: 'audio-status' }, 'CORRECTO')
                            )
                        )
                    )
                )
            ),
            React.createElement('button', { className: 'btn-add-card', onClick: addWordPair },
                React.createElement('span', { className: 'btn-add-card-icon' }, '+'),
                React.createElement('span', { className: 'btn-add-card-label' }, 'Agregar Nuevo Par')
            )
        );
    };

    // ========== RENDER QUIZ MODE ==========
    const renderQuizContent = () => {
        return React.createElement('div', { className: 'quiz-question-list' },
            // Mode Alert
            React.createElement('div', { className: 'mode-alert' },
                React.createElement('span', { className: 'mode-alert-icon' }, '⚠️'),
                React.createElement('div', null,
                    React.createElement('h4', { className: 'mode-alert-title' }, 'Modo Quiz'),
                    React.createElement('p', { className: 'mode-alert-text' },
                        'Cada ítem consiste en una pregunta y múltiples opciones de respuesta.'
                    )
                )
            ),
            // Questions
            quizQuestions.map((question, qIndex) =>
                React.createElement('div', { key: question.id, className: 'quiz-card' },
                    React.createElement('div', { className: 'quiz-card-header' },
                        React.createElement('div', { style: { display: 'flex', alignItems: 'center' } },
                            React.createElement('span', { className: 'quiz-card-number' }, qIndex + 1),
                            React.createElement('span', { className: 'quiz-card-title' }, 'Configuración de Pregunta')
                        ),
                        React.createElement('button', {
                            className: 'word-pair-action delete',
                            onClick: () => removeQuizQuestion(question.id)
                        }, '🗑️')
                    ),
                    React.createElement('div', { className: 'quiz-card-content' },
                        // Question Stimulus
                        React.createElement('div', { className: 'question-stimulus-section' },
                            React.createElement('div', { className: 'question-stimulus-header' },
                                React.createElement('span', { className: 'question-stimulus-label' }, '❓ Estímulo de Pregunta'),
                                React.createElement('div', { className: 'question-lang-select' },
                                    React.createElement('span', null, 'Idioma:'),
                                    React.createElement('select', {
                                        value: question.questionLang,
                                        onChange: (e) => handleQuizQuestionChange(question.id, 'questionLang', e.target.value)
                                    },
                                        React.createElement('option', { value: 'ESP' }, 'ESP (Español)'),
                                        React.createElement('option', { value: 'MAZ' }, 'MAZ (Mazahua)'),
                                        React.createElement('option', { value: 'ENG' }, 'ENG (Inglés)')
                                    )
                                )
                            ),
                            React.createElement('div', { className: 'question-stimulus-content' },
                                React.createElement('div', { className: 'question-input-area' },
                                    React.createElement('input', {
                                        type: 'text', className: 'question-input',
                                        placeholder: 'Escribe tu pregunta aquí...',
                                        value: question.question,
                                        onChange: (e) => handleQuizQuestionChange(question.id, 'question', e.target.value)
                                    })
                                ),
                                React.createElement('div', { className: 'question-media-area' },
                                    question.image ?
                                        React.createElement('div', { className: 'question-media-preview' },
                                            React.createElement('img', { src: question.image, alt: 'Question' }),
                                            React.createElement('span', { className: 'media-type-badge' }, 'Imagen'),
                                            React.createElement('button', {
                                                className: 'remove-media-btn',
                                                onClick: () => removeMedia('quiz', question.id, 'image')
                                            }, '×')
                                        ) :
                                        React.createElement('button', {
                                            className: 'add-media-btn',
                                            onClick: () => triggerImageUpload('quiz', question.id)
                                        },
                                            React.createElement('span', { className: 'add-media-icon' }, '🖼️'),
                                            React.createElement('span', { className: 'add-media-label' }, 'Imagen')
                                        ),
                                    React.createElement('button', {
                                        className: 'add-media-btn',
                                        onClick: () => triggerAudioUpload('quiz', question.id)
                                    },
                                        React.createElement('span', { className: 'add-media-icon' }, question.audio ? '✓' : '🎤'),
                                        React.createElement('span', { className: 'add-media-label' }, question.audio ? 'Audio ✓' : 'Audio')
                                    )
                                )
                            )
                        ),
                        // Answer Configuration
                        React.createElement('div', { className: 'answer-config-section' },
                            React.createElement('div', { className: 'answer-config-divider' },
                                React.createElement('span', null, 'Configuración de Respuestas')
                            ),
                            React.createElement('div', { className: 'answer-format-bar' },
                                React.createElement('div', { className: 'answer-format-left' },
                                    React.createElement('span', { className: 'answer-format-label' }, 'Formato:'),
                                    React.createElement('div', { className: 'answer-format-options' },
                                        ['text', 'images', 'audio', 'mixed'].map(format =>
                                            React.createElement('button', {
                                                key: format,
                                                className: `format-option-btn ${question.answerFormat === format ? 'active' : ''}`,
                                                onClick: () => handleQuizQuestionChange(question.id, 'answerFormat', format)
                                            }, format.charAt(0).toUpperCase() + format.slice(1))
                                        )
                                    )
                                ),
                                React.createElement('div', { className: 'answer-format-right' },
                                    React.createElement('span', null, 'Idioma:'),
                                    React.createElement('select', {
                                        className: 'word-pair-lang-select',
                                        value: question.answerLang,
                                        onChange: (e) => handleQuizQuestionChange(question.id, 'answerLang', e.target.value)
                                    },
                                        React.createElement('option', { value: 'ESP' }, 'ESP'),
                                        React.createElement('option', { value: 'MAZ' }, 'MAZ')
                                    )
                                )
                            ),
                            React.createElement('div', { className: 'answer-options-grid' },
                                question.options.map((option, oIndex) =>
                                    React.createElement('div', {
                                        key: option.id,
                                        className: `answer-option-card ${option.isCorrect ? 'correct' : ''}`
                                    },
                                        React.createElement('div', { className: 'answer-option-header' },
                                            React.createElement('span', { className: 'answer-option-label' },
                                                `Opción ${oIndex + 1}`
                                            ),
                                            React.createElement('div', {
                                                className: `toggle-correct ${option.isCorrect ? 'active' : ''}`,
                                                onClick: () => handleQuizOptionChange(question.id, option.id, 'isCorrect', !option.isCorrect)
                                            },
                                                React.createElement('span', null, 'Correcta'),
                                                React.createElement('div', {
                                                    className: `toggle-switch ${option.isCorrect ? 'active' : ''}`
                                                })
                                            )
                                        ),
                                        React.createElement('input', {
                                            type: 'text', className: 'answer-option-input',
                                            placeholder: 'Texto de respuesta...',
                                            value: option.text,
                                            onChange: (e) => handleQuizOptionChange(question.id, option.id, 'text', e.target.value)
                                        })
                                    )
                                )
                            )
                        )
                    )
                )
            ),
            React.createElement('button', { className: 'btn-add-question', onClick: addQuizQuestion },
                React.createElement('span', { className: 'btn-add-question-icon' }, '+'),
                React.createElement('span', { className: 'btn-add-question-label' }, 'Agregar Nueva Pregunta')
            )
        );
    };

    // ========== MAIN RENDER ==========
    return React.createElement('div', { className: 'educreator-container' },
        // Hidden file inputs
        React.createElement('input', {
            type: 'file', ref: imageInputRef, className: 'file-upload-hidden',
            accept: 'image/*', onChange: handleImageUpload
        }),
        React.createElement('input', {
            type: 'file', ref: audioInputRef, className: 'file-upload-hidden',
            accept: 'audio/*', onChange: handleAudioUpload
        }),

        // Header
        React.createElement('header', { className: 'educreator-header' },
            React.createElement('div', { className: 'header-left' },
                React.createElement('div', { className: 'header-logo' }, '📚'),
                React.createElement('h1', { className: 'header-title' }, 'MazahuaConnect Studio'),
                React.createElement('span', { className: 'header-version' }, 'v1.1')
            ),
            React.createElement('div', { className: 'header-right' },
                React.createElement('div', { className: 'header-status' },
                    React.createElement('span', { className: 'header-status-icon' }, '☁️'),
                    React.createElement('span', null, 'Guardado')
                ),
                React.createElement('button', {
                    className: 'btn-publish', onClick: handleSubmit,
                    disabled: loading || getItemCount() < 1
                }, loading ? '⏳ Publicando...' : '📤 Publicar')
            )
        ),

        // Main
        React.createElement('main', { className: 'educreator-main' },
            // Sidebar
            React.createElement('aside', { className: 'educreator-sidebar' },
                // General Config
                React.createElement('div', { className: 'sidebar-section' },
                    React.createElement('h3', { className: 'sidebar-section-title' }, 'Configuración General'),
                    React.createElement('div', { className: 'sidebar-input-group' },
                        React.createElement('label', { className: 'sidebar-label' }, 'Nombre'),
                        React.createElement('input', {
                            type: 'text', className: 'sidebar-input', name: 'name',
                            value: formData.name, onChange: handleInputChange,
                            placeholder: 'ej: Quiz de Animales'
                        })
                    ),
                    React.createElement('div', { className: 'sidebar-input-group' },
                        React.createElement('label', { className: 'sidebar-label' }, 'Descripción'),
                        React.createElement('textarea', {
                            className: 'sidebar-textarea', name: 'description',
                            value: formData.description, onChange: handleInputChange,
                            placeholder: 'Descripción de la actividad...', rows: 3
                        })
                    )
                ),
                // XP Box
                React.createElement('div', { className: 'sidebar-section' },
                    React.createElement('h3', { className: 'sidebar-section-title' }, 'Complejidad & Puntuación'),
                    React.createElement('div', { className: 'xp-box' },
                        React.createElement('div', { className: 'xp-box-header' },
                            React.createElement('span', { className: 'xp-box-title' }, 'XP Recomendado'),
                            React.createElement('span', { className: 'xp-box-icon' }, '✨')
                        ),
                        React.createElement('div', { className: 'xp-box-value' },
                            recommendedXP ? `${recommendedXP} XP` : '-- XP'
                        ),
                        React.createElement('p', { className: 'xp-box-description' },
                            'Basado en cantidad y variedad.'
                        ),
                        React.createElement('hr', { className: 'xp-box-divider' }),
                        React.createElement('label', { className: 'difficulty-slider-label' }, 'Dificultad'),
                        React.createElement('input', {
                            type: 'range', className: 'difficulty-slider',
                            min: 1, max: 5, value: difficultyLevel,
                            onChange: (e) => setDifficultyLevel(parseInt(e.target.value))
                        }),
                        React.createElement('div', { className: 'difficulty-labels' },
                            React.createElement('span', null, 'Fácil'),
                            React.createElement('span', null, 'Medio'),
                            React.createElement('span', null, 'Difícil')
                        )
                    )
                ),
                // Mode Selector
                React.createElement('div', { className: 'sidebar-section' },
                    React.createElement('h3', { className: 'sidebar-section-title' }, 'Modo de Actividad'),
                    React.createElement('div', { className: 'mode-selector' },
                        React.createElement('button', {
                            className: `mode-btn ${activityMode === 'wordPairs' ? 'active' : ''}`,
                            onClick: () => setActivityMode('wordPairs')
                        },
                            React.createElement('span', { className: 'mode-btn-icon' }, '🔀'),
                            React.createElement('span', { className: 'mode-btn-label' }, 'Pares')
                        ),
                        React.createElement('button', {
                            className: `mode-btn ${activityMode === 'quiz' ? 'active' : ''}`,
                            onClick: () => setActivityMode('quiz')
                        },
                            React.createElement('span', { className: 'mode-btn-icon' }, '❓'),
                            React.createElement('span', { className: 'mode-btn-label' }, 'Quiz')
                        )
                    )
                ),
                // Category
                React.createElement('div', { className: 'sidebar-section' },
                    React.createElement('h3', { className: 'sidebar-section-title' }, 'Categoría'),
                    React.createElement('select', {
                        className: 'sidebar-input', name: 'categoryId',
                        value: showNewCategory ? 'new' : formData.categoryId,
                        onChange: handleInputChange
                    },
                        React.createElement('option', { value: '' }, '-- Seleccionar --'),
                        categories.map(cat =>
                            React.createElement('option', { key: cat.id, value: cat.id }, cat.name)
                        ),
                        React.createElement('option', { value: 'new' }, '+ Nueva Categoría')
                    ),
                    showNewCategory && React.createElement('div', { className: 'new-category-input-container' },
                        React.createElement('label', { className: 'new-category-input-label' }, 'Nombre de la nueva categoría'),
                        React.createElement('input', {
                            type: 'text', className: 'new-category-input',
                            value: newCategoryName,
                            onChange: (e) => setNewCategoryName(e.target.value),
                            placeholder: 'ej: Animales de Granja'
                        })
                    )
                )
            ),

            // Content
            React.createElement('section', { className: 'educreator-content' },
                React.createElement('div', { className: 'content-wrapper' },
                    React.createElement('div', { className: 'content-header' },
                        React.createElement('div', null,
                            React.createElement('h2', { className: 'content-title' },
                                activityMode === 'quiz' ? 'Configuración de Quiz' : 'Configuración de Contenido'
                            ),
                            React.createElement('p', { className: 'content-subtitle' },
                                activityMode === 'quiz'
                                    ? 'Diseña tus preguntas y define las opciones de respuesta.'
                                    : 'Configura tus pares de palabras y recursos multimedia.'
                            )
                        )
                    ),
                    (error || success) && React.createElement('div', {
                        className: 'validation-alert',
                        style: success ? { background: '#f0fdf4', borderColor: '#86efac' } : {}
                    },
                        React.createElement('span', { className: 'validation-alert-icon' }, success ? '✅' : '⚠️'),
                        React.createElement('div', null,
                            React.createElement('p', { className: 'validation-alert-text' }, error || success)
                        )
                    ),
                    activityMode === 'quiz' ? renderQuizContent() : renderWordPairsContent(),
                    React.createElement('div', { style: { height: '80px' } })
                )
            )
        ),

        // Footer
        React.createElement('footer', { className: 'educreator-footer' },
            React.createElement('div', { className: 'footer-info' },
                React.createElement('strong', null, `${getItemCount()} ${activityMode === 'quiz' ? 'preguntas' : 'pares'}`),
                ' definidos'
            ),
            React.createElement('div', { className: 'footer-actions' },
                React.createElement('button', { className: 'btn-cancel', onClick: handleCancel }, 'Cancelar'),
                React.createElement('button', {
                    className: 'btn-save', onClick: handleSubmit,
                    disabled: loading || getItemCount() < 1
                }, loading ? 'Guardando...' : 'Guardar y Continuar →')
            )
        )
    );
};

export default ConfiguracionActividadView;