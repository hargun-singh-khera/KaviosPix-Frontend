import React, { useRef, useState } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import CreatableSelect from 'react-select/creatable';
import { authServerAxios } from '../../lib/axios.lib';
import toast from 'react-hot-toast';

const AddImageModal = ({ album, setImages }) => {

    // console.log("album", album);

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    const animatedComponents = makeAnimated();

    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        file: null,
        tags: [],
        person: "",
    })
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSelectChange = (selectedOption, actionMeta) => {
        const value = selectedOption;
        const { name } = actionMeta;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: checked }));
    }

    console.log("formData", formData);
    console.log("tags", formData?.tags?.map(tag => tag.value))

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            const fd = new FormData();
            const { file, tags, person, isFavorite } = formData;
            // fd.append("name", name);
            fd.append("image", file);
            tags.forEach(tag => {
                fd.append("tags", tag.value);
            });
            fd.append("person", person);
            fd.append("isFavorite", isFavorite);

            const response = await authServerAxios.post(`/albums/${album._id}/images`,
                fd, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            // console.log("response of image upload", response)
            toast.success("Image added successfully");
            setImages((prev) => [...prev, response?.data?.image]);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            setFormData({ file: null, tags: [], person: "" });
        } catch (error) {
            console.error("Error while adding image", error);
            toast.error("Failed to add image");
        } finally {
            setLoading(false);
        }
    }

    console.log("formData", formData);

    return (
        <div className="modal fade" id="imageModal" tabIndex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <form onSubmit={handleSubmit} className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="imageModalLabel">Add Photo</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {/* <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter name" />
                        </div> */}
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Upload Photo</label>
                            <input type="file" ref={fileInputRef} className="form-control" name="file" onChange={handleFileChange} id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" accept="image/*" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tags" className="form-label">Tags</label>
                            <CreatableSelect
                                id="tags"
                                components={animatedComponents}
                                value={formData.tags}
                                name="tags"
                                // options={options}
                                onChange={handleSelectChange}
                                isMulti
                                isClearable
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="person" className="form-label">Person</label>
                            <input type="text" className="form-control" id="person" name="person" value={formData.person} onChange={handleChange} placeholder="Enter name of the person" />
                        </div>
                        {/* <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" role="switch" id="switchCheckDefault" name="isFavorite" checked={formData.isFavorite} onChange={handleCheckboxChange} />
                            <label className="form-check-label" htmlFor="switchCheckDefault">Favorite</label>
                        </div> */}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" disabled={loading} className="btn btn-primary">
                            {loading && <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>}
                            <span role="status">{loading ? "Please wait..." : "Submit"}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddImageModal