import React, { useState } from 'react';
import { useContract, useContractRead } from "@thirdweb-dev/react";

const Status = () => {
    const [id, setId] = useState(0);
    const { contract } = useContract(process.env.NEXT_PUBLIC_SMART_CONTRACT);

    // Ensure id is passed as an array to the contract read function
    const { data: Complaints, isLoading, error } = useContractRead(contract, "Complaints", [id]);

    // Handle id change and ensure it's a number
    const handleIdChange = (e) => {
        setId(Number(e.target.value));
    };

    return (
        <div className='status-container'>
            <div className='status'>
                <p className='status-title'>Check Status of Your Complaint:</p>
                <div className='flex items-center justify-center'>
                    <p className='status-text'>Complaint ID:</p>
                    <input
                        type="number"
                        className='status-input md:w-[300px]'
                        placeholder='Enter Complaint ID'
                        onChange={handleIdChange}
                    />
                </div>
            </div>

            {isLoading ? (
                <p>Loading...</p>  // Show a loading message while data is being fetched
            ) : error ? (
                <p className="error-message">Failed to fetch complaint details. Please try again later.</p>
            ) : Complaints && Complaints.title ? (
                <div className="status-render-container md:w-[600px]">
                    <p className='status-render-title'>Complaint Details:</p>
                    <p className='status-render-text'>Complaint Id: {Complaints.id.toString()}</p>
                    <p className='status-render-text'>Complaint by: {Complaints.complaintRegisteredBy.toString()}</p>
                    <p className='status-render-text'>Complaint Title: {Complaints.title}</p>
                    <p className='status-render-text'>
                        Approval Status: {Complaints.isApproved ? "Approved" : !Complaints.exists ? "Declined" : "Approval Pending"}
                    </p>
                    <p className='status-render-text'>Approval Remark: {Complaints.approvalRemark}</p>
                    <p className='status-render-text'>Resolution Status: {Complaints.isResolved ? "Resolved" : "Resolution pending"}</p>
                    <p className='status-render-text mb-2'>Resolution Remark: {Complaints.resolutionRemark}</p>
                </div>
            ) : (
                <p>No complaint found for this ID.</p> // Display this if no complaint is found
            )}
        </div>
    );
};

export default Status;
