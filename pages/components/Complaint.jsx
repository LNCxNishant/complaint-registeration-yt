import React, { useState } from 'react';
import { useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import toast from "react-hot-toast";

const Complaint = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const { contract } = useContract(process.env.NEXT_PUBLIC_SMART_CONTRACT);
    const { data: nextId } = useContractRead(contract, "nextId")
    const { mutateAsync: fileComplaint } = useContractWrite(contract, "fileComplaint");

    const handleComplaint = async () => {
        const notification = toast.loading("Filing Complaint...");
        
        // Log title and description before calling the contract
        console.log("Filing complaint with title:", title, "and description:", description);
        
        // Ensure that title and description are strings and not empty
        if (!title || !description) {
            toast.error("Please fill in both the title and description.", {
                id: notification,
            });
            return;
        }
    
        try {
            // Pass title and description as arguments to fileComplaint
            const data = await fileComplaint([title, description]);
        
            // Log the result of the contract call
            console.log("Complaint filed successfully. Data:", data);
    
            toast.success(`Complaint Filed! Note Your ComplaintId:${nextId ? nextId.toString() : 'Loading...'}`, {
                id: notification,
            });
    
            // Reset fields after successful filing
            setTitle("");
            setDescription("");
        } catch (err) {
            console.error("Contract call failure", err);
            toast.error("Whoops, something went wrong!", {
                id: notification,
            });
        }
    };
    

    return (
        <div className='complaint-container md: mr-[50px] md:ml-[50px]'>
            <p className="complaint-title-red">File Your Complaint Here:</p>
            <div className='md:flex items-center'>
                <p className='complaint-text-margin'>Title: </p>
                <input type="text" className='container-input md:w-[500px] w-[300px]' placeholder='Enter Title Here'
                    onChange={(e) => { setTitle(e.target.value) }} />
            </div>
            <div className='md:flex items-center'>
                <p className='complaint-text-normal'>Description: </p>
                <input type="text" className='container-input md:w-[500px] w-[300px]' placeholder='Enter Description Here'
                    onChange={(e) => { setDescription(e.target.value) }} />
            </div>
            <button className="button-common hover:bg-blue-900" onClick={handleComplaint}>File Complaint</button>
        </div>
    )
}

export default Complaint