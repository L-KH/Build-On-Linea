'use client'
import React, {type ReactNode} from 'react';

interface IModal {
    id: string,
    children: ReactNode,
    className?: string,
    setOpen: (e: boolean) => void,
    open: boolean
}

const Modal = ({id, children, open, setOpen}: IModal) => {
    return (
        <>
            <input type="checkbox" id={id} className="modal-toggle" checked={open} readOnly/>

            <div className="modal">
                <div className="modal-box rounded-none max-h-none bg-gray-800">
                    {children}
                </div>
                <label className="modal-backdrop" htmlFor={id} onClick={() => setOpen(false)}></label>
            </div>
        </>
    );
};

export default Modal;