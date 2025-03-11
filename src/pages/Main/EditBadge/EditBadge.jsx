import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Space } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
const { Option } = Select;
import { FaAngleLeft } from "react-icons/fa6";
import { UploadOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { CiCamera } from "react-icons/ci";
import { useDeleteBadgeMutation, useEditBadgeMutation, useGetSingleBadgeQuery } from "../../../redux/features/badge/badgeApi";

const EditBadge = () => {
    const [form] = Form.useForm();
    const [file, setFile] = useState(null);
    const { badgeId } = useParams()
    const { data: badge, refetch } = useGetSingleBadgeQuery(badgeId)
    const [editBadge] = useEditBadgeMutation()
    const [deleteBadge] = useDeleteBadgeMutation()

    // Handle file selection
    const handleFileChange = ({ file }) => {
        setFile(file.originFileObj); // Save selected file
    };

    useEffect(() => {
        if (badge?.data) {
            form.setFieldsValue({
                name: badge.data.name,
                points: badge.data.points
            });
        }
    }, [badge, form]);

    const onFinish = async (values) => {
        const formattedData = {
            ...values,
            points: Number(values.points), // Ensure points is a number
        };

        Object.keys(formattedData).forEach(
            (key) => (formattedData[key] === "" || formattedData[key] === undefined) && delete formattedData[key]
        );

        const formData = new FormData();
        if (file) {
            formData.append("image", file);
        }

        formData.append("data", JSON.stringify(formattedData));

        try {
            const response = await editBadge({ badgeId, formData }).unwrap();
            console.log("Response from edit badge:", response);

            message.success("Badge edited successfully!");
            await refetch(); // Ensure updated data is fetched

            form.setFieldsValue({
                name: response.data.name,
                points: response.data.points,
            });

            setFile(null);
        } catch (error) {
            message.error(error.data?.message || "Failed to edit badge.");
        }
    };

    const handleDelete = async () => {
        try {
            // Call your delete API
            await deleteBadge(badgeId).unwrap();
            message.success("Badge deleted successfully!");
            navigate(-1); // Navigate back after deletion
        } catch (error) {
            message.error(error.data?.message || "Failed to delete badge.");
        }
    };


    const navigate = useNavigate();

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
                <h1 className="font-semibold">Edit Badge</h1>
            </div>
            <div className="rounded-lg py-4 border-[#79CDFF] border-2 shadow-lg mt-8 bg-white">
                <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
                    <h3 className="text-2xl text-[#174C6B] mb-4 border-b border-[#79CDFF]/50 pb-3 pl-16 font-semibold">
                        Editing Badge
                    </h3>
                    <div className="w-full px-16">
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                        // style={{ maxWidth: 600, margin: '0 auto' }}
                        >
                            <div className="grid grid-cols-2 gap-8 mt-8">
                                <div>
                                    <Space size="large" direction="horizontal" className="responsive-space-section-2">
                                        {/* Name */}
                                        <Form.Item
                                            label={<span style={{ fontSize: '18px', fontWeight: '600', color: '#2D2D2D' }}>Badge Name</span>}
                                            name="name"
                                            className="responsive-form-item"
                                        // rules={[{ required: true, message: 'Please select a package name!' }]}
                                        >
                                            <Input type="text"
                                                //  placeholder="Enter Badge Name"
                                                style={{
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

                                        {/* Phone */}
                                        <Form.Item
                                            label={<span style={{ fontSize: '18px', fontWeight: '600', color: '#2D2D2D' }}>Points To Achieve</span>}
                                            name="points"
                                            className="responsive-form-item-section-2"
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
                                    </Space>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Form.Item>
                                <div className="p-4 mt-10 text-center mx-auto flex items-center justify-center gap-10">
                                    <button
                                        type="button"
                                        className="w-[500px] border border-[#1E648C]/60 bg-[#EBF8FF] text-white px-10 h-[45px] flex items-center justify-center gap-3 text-lg outline-none rounded-md"
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

export default EditBadge
