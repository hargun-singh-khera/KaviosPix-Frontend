import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import CreatableSelect from 'react-select/creatable';
import { authServerAxios } from '../../lib/axios.lib';
import toast from 'react-hot-toast';

const AlbumShareModal = ({ album }) => {

    const [options, setOptions] = useState([]);
    // const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    // const options = [
    //     { value: 'chocolate', label: 'Chocolate' },
    //     { value: 'strawberry', label: 'Strawberry' },
    //     { value: 'vanilla', label: 'Vanilla' }
    // ]

    const animatedComponents = makeAnimated();

    console.log("options", options);

    const fetchUsers = async () => {
        try {
            const response = await authServerAxios.get("/users", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log("response of fetch users", response);
            const options = response?.data?.users?.map((user) => ({ value: user.email, label: user.email }));
            setOptions(options);
            // setUsers(response?.data?.users);
        } catch (error) {
            console.error("Error while fetching users", error);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    console.log("options", options);
    console.log("selectedUsers", selectedUsers);



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!selectedUsers.length) {
                toast.error("Please select at least one user");
                return;
            }
            setLoading(true);
            const response = await authServerAxios.post(`/albums/${album._id}/share`,
                { emails: options.map((option) => option.value) },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            console.log("response of share album", response);
            toast.success("Album shared successfully");
            setSelectedUsers([]);
        } catch (error) {
            console.error("Error while sharing album", error);
            toast.error("Failed to share album");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="modal fade" id="albumShareModal" tabIndex="-1" aria-labelledby="albumModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <form onSubmit={handleSubmit} className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="albumModalLabel">Share Album</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div class="mb-3">
                            <label for="email" class="form-label">Email address</label>
                            <Select
                                isMulti
                                isClearable
                                components={animatedComponents}
                                value={selectedUsers}
                                onChange={(selected) => setSelectedUsers(selected)}
                                options={options}
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button class="btn btn-primary" type="submit" disabled={loading}>
                            {loading && <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>}
                            <span role="status">{loading ? "Please wait..." : "Add User"}</span>
                        </button>
                        {/* <button class="btn btn-primary">Add User</button> */}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AlbumShareModal