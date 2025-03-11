import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { Form, Input, Button, Select, Space, Radio } from 'antd';
const { Option } = Select;
import { FaAngleLeft } from "react-icons/fa6";
import { message, Upload } from 'antd';
import { CiCamera } from "react-icons/ci";
import { useCreateMealMutation } from "../../../redux/features/meal/mealApi";


const AddMeal = () => {
    const [form] = Form.useForm();
    const [file, setFile] = useState(null);
    const [createMeal, { isLoading }] = useCreateMealMutation();


    // Handle file selection
    const handleFileChange = ({ file }) => {
        setFile(file.originFileObj); // Save selected file
    };

    // Logic for multi select input
    const options = [
        { value: "Vegan", label: "Vegan" },
        { value: "Vegetarian", label: "Vegetarian" },
        { value: "No Preference", label: "No Preference" },
        { value: "Keto/Low Carb", label: "Keto/Low Carb" },
        { value: "Gluten-Free", label: "Gluten-Free" },
    ];

    const handleMultiSelectChange = (value) => {
        console.log(`Selected: ${value}`);
    };

    const onFinish = async (values) => {
        if (!file) {
            message.error("Please upload an image!");
            return;
        }

        // Restructure the form data to include nutritionalInfo
        const formattedData = {
            ...values, // Spread other fields
            nutritionalInfo: {
                calories: Number(values.calories),
                carbs: Number(values.carbs),
                proteins: Number(values.proteins),
                fats: Number(values.fats),
            },
        };

        // Create FormData
        const formData = new FormData();
        formData.append("image", file); // Append image
        formData.append("data", JSON.stringify(formattedData)); // Convert text fields to JSON

        try {
            const response = await createMeal(formData).unwrap();
            console.log(response, 'response from add meal');

            message.success("Meal created successfully!");
            form.resetFields(); // Reset form
            setFile(null); // Clear file
        } catch (error) {
            message.error(error.data?.message || "Failed to create meal.");
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
                <h1 className="font-semibold">Add Meal</h1>
            </div>
            <div className="rounded-lg py-4 border-[#79CDFF] border-2 shadow-lg mt-8 bg-white">
                <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
                    <h3 className="text-2xl text-[#174C6B] mb-4 border-b border-[#79CDFF]/50 pb-3 pl-16 font-semibold">
                        Meal Item Adding
                    </h3>
                    <div className="w-full px-16">
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                        // style={{ maxWidth: 600, margin: '0 auto' }}
                        >
                            {/* Section 1 */}
                            <Space direction="vertical" style={{ width: '100%', borderBottom: '1px solid #79CDFF', paddingBottom: '32px' }}>
                                <Space size="large" direction="horizontal" className="responsive-space">
                                    {/* Name */}
                                    <Form.Item
                                        label={<span style={{ fontSize: '18px', fontWeight: '600', color: '#2D2D2D' }}>Meal Name</span>}
                                        name="mealName"
                                        className="responsive-form-item"
                                    // rules={[{ required: true, message: 'Please select a package name!' }]}
                                    >
                                        <Input type="text" placeholder="Enter Meal Name" style={{
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

                                    {/* Meal Type */}
                                    <Form.Item
                                        label={<span style={{ fontSize: '18px', fontWeight: '600', color: '#2D2D2D' }}>Meal Type</span>}
                                        name="mealTime"
                                        className="responsive-form-item"
                                    // rules={[{ required: true, message: 'Please select a duration!' }]}
                                    >
                                        <Select placeholder="Select Type"
                                            style={{
                                                height: '40px',
                                                fontWeight: 600,
                                                border: 'none', // Remove the custom border styling here
                                                fontSize: '18px',
                                                color: '#525252',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}
                                            dropdownStyle={{
                                                border: '1px solid #79CDFF', // Custom border for dropdown if needed
                                            }}
                                        >
                                            <Option value="Breakfast">Breakfast</Option>
                                            <Option value="Lunch">Lunch</Option>
                                            <Option value="Dinner">Dinner</Option>
                                            <Option value="Snacks">Snacks</Option>
                                        </Select>
                                    </Form.Item>

                                    {/*  category */}
                                    <Form.Item
                                        label={<span style={{ fontSize: '18px', fontWeight: '600', color: '#2D2D2D' }}>Category</span>}
                                        name="category"
                                        className="responsive-form-item"
                                    // rules={[{ required: true, message: 'Please select a duration!' }]}
                                    >
                                        <Select placeholder="Select Category"
                                            style={{
                                                height: '40px',
                                                fontWeight: 600,
                                                border: 'none', // Remove the custom border styling here
                                                fontSize: '18px',
                                                color: '#525252',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}
                                            dropdownStyle={{
                                                border: '1px solid #79CDFF', // Custom border for dropdown if needed
                                            }}
                                        >
                                            <Option value="vegan">Vegan</Option>
                                            <Option value="vegitarian">Vegitarian</Option>
                                            <Option value="keto">Keto/Low Carb</Option>
                                            <Option value="high-protein">High-Protein</Option>
                                        </Select>
                                    </Form.Item>

                                    {/* Suitable for  */}
                                    <Form.Item
                                        label={<span style={{ fontSize: '18px', fontWeight: '600', color: '#2D2D2D' }}>Suitable For:</span>}
                                        name="suitableFor"
                                        className="responsive-form-item"
                                    // rules={[{ required: true, message: 'Please select a duration!' }]}
                                    >
                                        <Select
                                            mode="multiple"
                                            size={'middle'}
                                            placeholder="Please select"
                                            defaultValue={['Vegetarian']}
                                            onChange={handleMultiSelectChange}
                                            style={{
                                                width: '100%',
                                                height: '40px',
                                            }}
                                            options={options}
                                        />
                                    </Form.Item>

                                    {/* Amount */}
                                    <Form.Item
                                        label={<span style={{ fontSize: '18px', fontWeight: '600', color: '#2D2D2D' }}>Amount</span>}
                                        name="amount"
                                        className="responsive-form-item"
                                    // rules={[{ required: true, message: 'Please select a duration!' }]}
                                    >
                                        <Input type="number" placeholder="Add Amount" style={{
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
                            </Space>

                            {/* Section 2 */}
                            <div className="grid grid-cols-2 gap-8 mt-8">
                                <div>
                                    <h1 className="text-[18px] font-semibold pb-3">Nutritional Info</h1>
                                    <Space size="large" direction="horizontal" className="responsive-space-section-2">
                                        <Form.Item
                                            label={<span style={{ fontSize: '18px', fontWeight: '600', color: '#2D2D2D' }}>Calories</span>}
                                            name="calories"
                                            className="responsive-form-item-section-2"
                                        >
                                            <Input type="number" placeholder="Add Calories" style={{
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
                                        <Form.Item
                                            label={<span style={{ fontSize: '18px', fontWeight: '600', color: '#2D2D2D' }}>Carbs</span>}
                                            name="carbs"
                                            className="responsive-form-item-section-2"
                                        >
                                            <Input type="number" placeholder="Add Carbs" style={{
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
                                        <Form.Item
                                            label={<span style={{ fontSize: '18px', fontWeight: '600', color: '#2D2D2D' }}>Proteins</span>}
                                            name="proteins"
                                            className="responsive-form-item-section-2"
                                        >
                                            <Input type="number" placeholder="Add Proteins" style={{
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
                                        <Form.Item
                                            label={<span style={{ fontSize: '18px', fontWeight: '600', color: '#2D2D2D' }}>Fats</span>}
                                            name="fats"
                                            className="responsive-form-item-section-2"
                                        >
                                            <Input type="number" placeholder="Add Fats" style={{
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
                                <div className="p-4 mt-10 text-center mx-auto flex items-center justify-center">
                                    <button
                                        className="w-[500px] bg-[#174C6B] text-white px-10 h-[45px] flex items-center justify-center gap-3 text-lg outline-none rounded-md "
                                    >
                                        <span className="text-white font-semibold">Create</span>
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

export default AddMeal
