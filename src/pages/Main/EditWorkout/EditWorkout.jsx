import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Space } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
const { Option } = Select;
import { FaAngleLeft } from "react-icons/fa6";
import { UploadOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { CiCamera } from "react-icons/ci";
import { useDeleteWorkoutMutation, useEditWorkoutMutation, useGetSingleWorkoutQuery } from "../../../redux/features/workout/workoutApi";


const EditWorkout = () => {
    const [file, setFile] = useState(null);
    const [form] = Form.useForm();
    const { workoutId } = useParams()
    const navigate = useNavigate();

    const { data: workout, refetch } = useGetSingleWorkoutQuery(workoutId)
    const [editWorkout] = useEditWorkoutMutation()
    const [deleteWorkout] = useDeleteWorkoutMutation()

    // Handle Video Upload
    const handleFileChange = ({ file }) => {
        setFile(file.originFileObj);
    };

    // Logic for multi select input
    const options = workout?.data?.exercises.map((exercise) => ({
        value: exercise._id,  // Value stored in the database
        label: exercise.name, // Displayed in the UI
    })) || [];


    const handleMultiSelectChange = (value) => {
        console.log(`Selected: ${value}`);
    };

    const onFinish = async (values) => {
        // Create FormData
        const formData = new FormData();
        if (file) {
            formData.append("image", file);
        }
        formData.append("data", JSON.stringify(values)); // Convert text fields to JSON

        try {
            const response = await editWorkout({ workoutId, formData }).unwrap();
            message.success("workout edited successfully!");
            form.resetFields(); // Reset form
            setFile(null); // Clear file
        } catch (error) {
            message.error(error.data?.message || "Failed to edit workout.");
        }
    };

    const handleDelete = async () => {
        try {
            // Call your delete API
            await deleteWorkout(workoutId).unwrap();
            message.success("workout deleted successfully!");
            navigate(-1); // Navigate back after deletion
        } catch (error) {
            message.error(error.data?.message || "Failed to delete workout.");
        }
    };

    useEffect(() => {
        if (workout?.data) {
            form.setFieldsValue({
                name: workout.data.name,
                description: workout.data.description,
                points: workout.data.points,
                exercises: workout.data.exercises.map((exercise) => exercise._id),
            });
        }
    }, [workout, form]);

    const handleBackButtonClick = () => {
        navigate(-1); // This takes the user back to the previous page
    };

    const props = {
        name: 'file',
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    return (
        <>
            <div className="flex items-center gap-2 text-xl cursor-pointer" onClick={handleBackButtonClick}>
                <FaAngleLeft />
                <h1 className="font-semibold">Edit Workout</h1>
            </div>
            <div className="rounded-lg py-4 border-[#79CDFF] border-2 shadow-lg mt-8 bg-white">
                <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
                    <h3 className="text-2xl text-[#174C6B] mb-4 border-b border-[#79CDFF]/50 pb-3 pl-16 font-semibold">
                        Editing Workout
                    </h3>
                    <div className="w-full px-16">
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                        // style={{ maxWidth: 600, margin: '0 auto' }}
                        >
                            {/* Section 1 */}
                            <Space direction="vertical" style={{ width: '100%' }}>
                                <Space size="large" direction="horizontal" className="responsive-space">
                                    {/* Name */}
                                    <Form.Item
                                        label={<span style={{ fontSize: '18px', fontWeight: '600', color: '#2D2D2D' }}>Workout Name</span>}
                                        name="name"
                                        className="responsive-form-item"
                                    // rules={[{ required: true, message: 'Please select a package name!' }]}
                                    >
                                        <Input type="text" placeholder="Enter Workout Name" style={{
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
                                        label={<span style={{ fontSize: '18px', fontWeight: '600', color: '#2D2D2D' }}>Workout Description</span>}
                                        name="description"
                                        className="responsive-form-item"
                                    // rules={[{ required: true, message: 'Please select a package name!' }]}
                                    >
                                        <Input type="text" placeholder="Enter Workout Description" style={{
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
                                        <Upload {...props}
                                            onChange={handleFileChange}
                                            maxCount={1}
                                        >
                                            <Button style={{ width: '440px', height: '40px', border: '1px solid #79CDFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ color: '#525252', fontSize: '16px', fontWeight: 600 }}>Select an image</span>
                                                <CiCamera size={25} color="#174C6B" />
                                            </Button>
                                        </Upload>
                                    </Form.Item>

                                    {/* Points */}
                                    <Form.Item
                                        label={<span style={{ fontSize: '18px', fontWeight: '600', color: '#2D2D2D' }}>Points</span>}
                                        name="points"
                                        className="responsive-form-item"
                                    // rules={[{ required: true, message: 'Please select a package name!' }]}
                                    >
                                        <Input type="number" placeholder="Enter Points" style={{
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


                                    {/* Exercises */}
                                    <Form.Item
                                        label={<span style={{ fontSize: '18px', fontWeight: '600', color: '#2D2D2D' }}>Select Exercise</span>}
                                        name="exercises"
                                        className="responsive-form-item"
                                    // rules={[{ required: true, message: 'Please select a duration!' }]}
                                    >
                                        <Select
                                            mode="multiple"
                                            size={'middle'}
                                            placeholder="Select Exercise"
                                            // defaultValue={['Vegetarian']}
                                            onChange={handleMultiSelectChange}
                                            style={{
                                                width: '100%',
                                            }}
                                            options={options}
                                        />
                                    </Form.Item>

                                </Space>
                            </Space>

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

export default EditWorkout
