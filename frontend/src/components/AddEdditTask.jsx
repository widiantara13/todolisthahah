import { useEffect, useId, useRef, useState } from "react";
import { format, isValid, parse } from "date-fns";
import { DayPicker } from "react-day-picker";
// Pastikan CSS untuk react-day-picker diimpor di file entry point (misal: index.js atau App.js)
// import 'react-day-picker/dist/style.css'; 

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTask, reset } from '../feature/TaskSlice.js';

function AddEditTask() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    
    const [selectedDoDate, setSelectedDoDate] = useState(undefined);
    const [doDateInput, setDoDateInput] = useState("");

    const dialogRef = useRef(null);
    const dialogId = useId();
    const headerId = useId();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [month, setMonth] = useState(new Date());

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { task, isSuccess, isError, isLoading, message } = useSelector((state) => state.task);

    useEffect(() => {
        if (isSuccess) {
            dispatch(reset());
            navigate('/');
        }
        if (isError) {
            console.error("Error adding task:", message);
        }
        return () => {
            dispatch(reset());
        };
    }, [isSuccess, isError, message, navigate, dispatch]);

    useEffect(() => {
        const handleBodyScroll = (isOpen) => { 
            document.body.style.overflow = isOpen ? "hidden" : "";
        };
        if (!dialogRef.current) return;
        if (isDialogOpen) {
            handleBodyScroll(true);
            dialogRef.current.showModal();
        } else {
            handleBodyScroll(false);
            dialogRef.current.close();
        }
        return () => {
            handleBodyScroll(false);
        };
    }, [isDialogOpen]);

    const handleDayPickerSelect = (date) => { 
        if (!date) {
            setDoDateInput("");
            setSelectedDoDate(undefined);
        } else {
            setSelectedDoDate(date);
            setDoDateInput(format(date, "dd/MM/yyyy"));
        }
        dialogRef.current?.close();
        setIsDialogOpen(false);
    };

    const handleDoDateInputChange = (e) => { 
        setDoDateInput(e.target.value);

        let parsedDate = parse(e.target.value, "dd/MM/yyyy", new Date());

        if (!isValid(parsedDate)) {
            parsedDate = parse(e.target.value, "dd-MM-yyyy", new Date());
        }
        if (!isValid(parsedDate)) {
            parsedDate = parse(e.target.value, "yyyy-MM-dd", new Date());
        }

        if (isValid(parsedDate)) {
            setSelectedDoDate(parsedDate);
            setMonth(parsedDate);
        } else {
            setSelectedDoDate(undefined);
        }
    };

    const toggleDoDateDialog = () => setIsDialogOpen(!isDialogOpen);

    const saveTask = (e) => {
        e.preventDefault();
        
        if (!selectedDoDate) {
            alert("Please select a 'Do Date'.");
            return;
        }

        const formattedDoDateForBackend = format(selectedDoDate, "yyyy-MM-dd");

        dispatch(addTask({
            title,
            description,
            do_date: formattedDoDateForBackend,
        }));
    };

    return (
        <div className="hero is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className='container'>
                    <div className='columns is-centered'>
                        <div className='column is-4'>
                            <form className='box' onSubmit={saveTask}>
                                <div className="field">
                                    <label className="label" htmlFor="title">Title</label>
                                    <div className="control">
                                        <input className="input"
                                            type="text"
                                            name="title"
                                            id="title"
                                            value={title}
                                            onChange={(event) => setTitle(event.target.value)}
                                            placeholder="Task Title"
                                            required />
                                    </div>
                                
                                </div>
                                <div className="field">
                                    <label className="label" htmlFor="description">Description</label>
                                    <div className="control">
                                        <textarea className="textarea"
                                            name="description"
                                            id="description"
                                            value={description}
                                            onChange={(event) => setDescription(event.target.value)}
                                            placeholder="e.g. Hello world"></textarea>
                                    </div>
                                </div>
                                
                                <div className="field">
                                    <label className="label" htmlFor="do_date_input">Do Date</label>
                                    <div className="control">
                                        <div className="field has-addons">
                                            <div className="control is-expanded">
                                                <input className="input"
                                                    id="do_date_input"
                                                    type="text"
                                                    value={doDateInput}
                                                    placeholder="DD/MM/YYYY"
                                                    onChange={handleDoDateInputChange}
                                                    required />
                                            </div>
                                            <div className="control">
                                                <button
                                                    type="button"
                                                    className="button is-info"
                                                    onClick={toggleDoDateDialog}
                                                    aria-controls={dialogId}
                                                    aria-haspopup="dialog"
                                                    aria-expanded={isDialogOpen}
                                                    aria-label="Open calendar to choose do date"
                                                >
                                                    📆
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <p aria-live="assertive" aria-atomic="true" className="help">
                                        {selectedDoDate !== undefined
                                            // **PERBAIKAN ERROR DI SINI**
                                            ? `Selected: ${format(selectedDoDate, "dd MMMM yyyy")}` // Contoh: 28 Juni 2025
                                            : "Please type or pick a date"}
                                    </p>
                                </div>

                                <div className="field">
                                    <div className="control">
                                        <button className={`button is-success is-fullwidth ${isLoading ? 'is-loading' : ''}`} type="submit">
                                            {isLoading ? 'Loading...' : 'Save Task'}
                                        </button>
                                    </div>
                                </div>
                                {isError && <p className="help is-danger">{message}</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <dialog
                role="dialog"
                ref={dialogRef}
                id={dialogId}
                aria-modal
                aria-labelledby={headerId}
                onClose={() => setIsDialogOpen(false)}
            >
                <DayPicker
                    month={month}
                    onMonthChange={setMonth}
                    autoFocus
                    mode="single"
                    selected={selectedDoDate}
                    onSelect={handleDayPickerSelect}
                    footer={
                        selectedDoDate !== undefined &&
                        // **PERBAIKAN ERROR DI SINI JUGA**
                        `Selected: ${format(selectedDoDate, "dd MMMM yyyy")}` // Contoh: 28 Juni 2025
                    }
                />
            </dialog>
        </div>
    );
}

export default AddEditTask;