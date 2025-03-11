import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Space } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
const { Option } = Select;
import { FaAngleLeft } from "react-icons/fa6";
import { UploadOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { CiCamera } from "react-icons/ci";
import { useDeleteExerciseMutation, useEditExerciseMutation, useGetSingleExerciseQuery } from "../../../redux/features/exercise/exerciseApi";


const EditExercise = () => {
    const [form] = Form.useForm();
    const [videoFile, setVideoFile] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const { exerciseId } = useParams()
    const navigate = useNavigate();

    const { data: exercise, refetch } = useGetSingleExerciseQuery(exerciseId)

    const [editExercise] = useEditExerciseMutation()
    const [deleteExercise] = useDeleteExerciseMutation()

    useEffect(() => {
        if (exercise?.data) {
            form.setFieldsValue({
                name: exercise.data.exercise.name,
                description: exercise.data.exercise.description,
                points: exercise.data.exercise.points,
                points: exercise.data.exercise.points,
                duration: exercise.data.exercise.duration,
                goal: exercise.data.exercise.goal,
                reps: exercise.data.exercise.reps,
                sets: exercise.data.exercise.sets,
                restTime: exercise.data.exercise.restTime,
            });
        }
    }, [exercise, form]);

    // Handle Video Upload
    const handleVideoChange = ({ file }) => {
        setVideoFile(file.originFileObj);
    };

    // Handle Image Upload
    const handleImageChange = ({ file }) => {
        setImageFile(file.originFileObj);
    };

    const onFinish = async (values) => {
        console.log(values);

        const formattedData = {
            ...values,
            points: Number(values.points),
            duration: Number(values.duration),
            reps: Number(values.reps),
            sets: Number(values.sets),
            restTime: Number(values.restTime)
        }
        // Create FormData
        const formData = new FormData();
        if (imageFile) {
            formData.append("image", imageFile);
        }
        if (videoFile) {
            formData.append("media", videoFile);
        }
        formData.append("data", JSON.stringify(formattedData)); // Convert text fields to JSON

        try {
            const response = await editExercise({ exerciseId, formData }).unwrap();
            console.log(response, 'response from edit exercise');

            message.success("exercise edited successfully!");
            form.resetFields(); // Reset form
            setFile(null); // Clear file
        } catch (error) {
            message.error(error.data?.message || "Failed to edit exercise.");
        }
    };

    const handleBackButtonClick = () => {
        navigate(-1); // This takes the user back to the previous page
    };

    const handleDelete = async () => {
        try {
            // Call your delete API
            await deleteExercise(exerciseId).unwrap();
            message.success("exercise deleted successfully!");
            navigate(-1); // Navigate back after deletion
        } catch (error) {
            message.error(error.data?.message || "Failed to delete exercise.");
        }
    };

    const videoUploadProps = {
        name: 'video',
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        headers: {
            authorization: 'authorization-text',
        },
        beforeUpload: (file) => {
            const isVideo = file.type.startsWith('video/');
            if (!isVideo) {
                message.error('You can only upload video files!');
            }
            return isVideo;
        },
        onChange(info) {
            if (info.file.status === 'done') {
                message.success(`${info.file.name} video uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} video upload failed.`);
            }
        },
    };

    const imageUploadProps = {
        name: 'image',
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        headers: {
            authorization: 'authorization-text',
        },
        beforeUpload: (file) => {
            const isImage = file.type.startsWith('image/');
            if (!isImage) {
                message.error('You can only upload image files!');
            }
            return isImage;
        },
        onChange(info) {
            if (info.file.status === 'done') {
                message.success(`${info.file.name} image uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} image upload failed.`);
            }
        },
    };
    return (
        <>
            <div className="flex items-center gap-2 text-xl cursor-pointer" onClick={handleBackButtonClick}>
                <FaAngleLeft />
                <h1 className="font-semibold">Edit Exercise</h1>
            </div>
            <div className="rounded-lg py-4 border-[#79CDFF] border-2 shadow-lg mt-8 bg-white">
                <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
                    <h3 className="text-2xl text-[#174C6B] mb-4 border-b border-[#79CDFF]/50 pb-3 pl-16 font-semibold">
                        Editing Exercise
                    </h3>
                    <div className="w-full px-16">
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                        // style={{ maxWidth: 600, margin: '0 auto' }}
                        >
                            {/* Section 1 */}
                            <Space direction="vertical" style={{ width: '100%', borderBottom: '1px solid #79CDFF' }}>
                                <Space size="large" direction="horizontal" className="responsive-space">
                                    {/* Name */}
                                    <Form.Item
                                        label={<span style={{ fontSize: '18px', fontWeight: '600', color: '#2D2D2D' }}>Exercise Name</span>}
                                        name="name"
                                        className="responsive-form-item"
                                    // rules={[{ required: true, message: 'Please select a package name!' }]}
                                    >
                                        <Input type="text" placeholder="Enter Exercise Name" style={{
                                            height: '40px',
                                            border: '1px solid #79CDFF',
                                            fontSize: '16px',
                                            fontWeight: 600,
                                            color: '#525252',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }} />
                                    </Form.Item>

                                    {/* Description */}
                                    <Form.Item
                                        label={<span style={{ fontSize: '18px', fontWeight: '600', color: '#2D2D2D' }}>Exercise Name</span>}
                                        name="description"
                                        className="responsive-form-item"
                                    // rules={[{ required: true, message: 'Please select a package name!' }]}
                                    >
                                        <Input type="text" placeholder="Enter Exercise Name" style={{
                                            height: '40px',
                                            border: '1px solid #79CDFF',
                                            fontSize: '16px',
                                            fontWeight: 600,
                                            color: '#525252',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }} />
                                    </Form.Item>

                                    {/* Image */}
                                    <Form.Item
                                        label={<span style={{ fontSize: '18px', fontWeight: '600', color: '#2D2D2D' }}>Upload Image</span>}
                                        name="image"
                                        className="responsive-form-item"
                                    // rules={[{ required: true, message: 'Please enter the package amount!' }]}
                                    >
                                        <Upload {...imageUploadProps} onChange={handleImageChange} maxCount={1}>
                                            <Button style={{ width: '440px', height: '40px', border: '1px solid #79CDFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ color: '#525252', fontSize: '16px', fontWeight: 600 }}>Select an image</span>
                                                <CiCamera size={25} color="#174C6B" />
                                            </Button>
                                        </Upload>
                                    </Form.Item>

                                    {/* Video */}
                                    <Form.Item
                                        label={<span style={{ fontSize: '18px', fontWeight: '600', color: '#2D2D2D' }}>Upload Video</span>}
                                        name="media"
                                        className="responsive-form-item"
                                    // rules={[{ required: true, message: 'Please enter the package amount!' }]}
                                    >
                                        <Upload {...videoUploadProps} onChange={handleVideoChange} maxCount={1}>
                                            <Button style={{ width: '440px', height: '40px', border: '1px solid #79CDFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ color: '#525252', fontSize: '16px', fontWeight: 600 }}>Select an video</span>
                                                <CiCamera size={25} color="#174C6B" />
                                            </Button>
                                        </Upload>
                                    </Form.Item>

                                </Space>
                            </Space>

                            {/* Section 2 */}
                            <div className="grid grid-cols-2 gap-8 mt-8">
                                <div>
                                    <h1 className="text-[18px] font-semibold pb-3">Information</h1>
                                    <Space size="large" direction="horizontal" className="responsive-space-section-2">
                                        {/* Duration */}
                                        <Form.Item
                                            label={<span style={{ fontSize: '18px', fontWeight: '600', color: '#2D2D2D' }}>Duration</span>}
                                            name="duration"
                                            className="responsive-form-item-section-2"
                                        >
                                            <Input type="number" placeholder="Set duration" style={{
                                                height: '40px',
                                                border: '1px solid #79CDFF',
                                                fontSize: '16px',
                                                fontWeight: 600,
                                                color: '#525252',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }} />
                                        </Form.Item>

                                        {/* Points */}
                                        <Form.Item
                                            label={<span style={{ fontSize: '18px', fontWeight: '600', color: '#2D2D2D' }}>Reward Points</span>}
                                            name="points"
                                            className="responsive-form-item-section-2"
                                        >
                                            <Input type="number" placeholder="Set reward point" style={{
                                                height: '40px',
                                                border: '1px solid #79CDFF',
                                                fontSize: '16px',
                                                fontWeight: 600,
                                                color: '#525252',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }} />
                                        </Form.Item>

                                        {/* Goal */}
                                        <Form.Item
                                            label={<span style={{ fontSize: '18px', fontWeight: '600', color: '#2D2D2D' }}>Goal</span>}
                                            name="goal"
                                            className="responsive-form-item-section-2"
                                        >
                                            <Input type="text" placeholder="Set goal" style={{
                                                height: '40px',
                                                border: '1px solid #79CDFF',
                                                fontSize: '16px',
                                                fontWeight: 600,
                                                color: '#525252',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }} />
                                        </Form.Item>

                                        {/* Reps */}
                                        <Form.Item
                                            label={<span style={{ fontSize: '18px', fontWeight: '600', color: '#2D2D2D' }}>Reps</span>}
                                            name="reps"
                                            className="responsive-form-item-section-2"
                                        >
                                            <Input type="number" placeholder="Set Reps" style={{
                                                height: '40px',
                                                border: '1px solid #79CDFF',
                                                fontSize: '16px',
                                                fontWeight: 600,
                                                color: '#525252',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }} />
                                        </Form.Item>

                                        {/* Sets */}
                                        <Form.Item
                                            label={<span style={{ fontSize: '18px', fontWeight: '600', color: '#2D2D2D' }}>Sets</span>}
                                            name="sets"
                                            className="responsive-form-item-section-2"
                                        >
                                            <Input type="number" placeholder="Set sets" style={{
                                                height: '40px',
                                                border: '1px solid #79CDFF',
                                                fontSize: '16px',
                                                fontWeight: 600,
                                                color: '#525252',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }} />
                                        </Form.Item>

                                        {/* Rest time */}
                                        <Form.Item
                                            label={<span style={{ fontSize: '18px', fontWeight: '600', color: '#2D2D2D' }}>Rest Time</span>}
                                            name="restTime"
                                            className="responsive-form-item-section-2"
                                        >
                                            <Input type="number" placeholder="Set rest time" style={{
                                                height: '40px',
                                                border: '1px solid #79CDFF',
                                                fontSize: '16px',
                                                fontWeight: 600,
                                                color: '#525252',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }} />
                                        </Form.Item>
                                    </Space>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Form.Item>
                                <div className="p-4 mt-10 text-center mx-auto flex items-center justify-center gap-10">
                                    <button
                                        type="button"
                                        className="w-[500px] border border-[#1E648C]/60 bg-[#EBF8FF] text-white px-10 h-[45px] flex items-center justify-center gap-3 text-lg outline-none rounded-md "
                                        onClick={() => handleDelete()}
                                    >
                                        <span className="text-[#1E648C] font-semibold">Delete</span>
                                    </button>
                                    <button
                                        type="submit"
                                        className="w-[500px] bg-[#174C6B] text-white px-10 h-[45px] flex items-center justify-center gap-3 text-lg outline-none rounded-md "
                                    >
                                        <span className="text-white font-semibold">Update</span>
                                    </button>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditExercise
