import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./todo.module.css";
import { uid } from "uid";
import { ThemeContext } from "../context/theme_context";


interface Note {
    id: string
    content: string
    state: "active" | "completed"
}
type Notes = Note[]
type filters = "all" | "active" | "completed"

export default function Todo(): React.JSX.Element {
    const { theme, change } = useContext(ThemeContext)
    const input = useRef<HTMLInputElement | null>(null);
    const [notes, setNote] = useState<Notes>([]);
    const [valueState, setValueState] = useState<string>("");
    const [filteredNotes, setFilteredNotes] = useState<Notes>([]);
    const [filter, setFilter] = useState<filters>("all")
    const [selected, setSelected] = useState<filters>("all")
    // const [notePosition,setNotePosition] = useState<number>(0)
    const id = uid(3);


    useEffect(() => {
        getNoteFiltered(filter)
    }, [notes])

    function dragStart(e: React.DragEvent<HTMLDivElement>) {

        e.dataTransfer.setData("text/plain", `${e.target.dataset.position},${e.target.outerHTML}`)
        e.target.classList.add("dragging")
        e.target.style.opacity = .5
    }

    function dragOver(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();

        if (e.target.className.includes("todo_note")) {
            e.target.style.borderBottom = "1px solid grey"
            console.log("incluye")

        }

    }
    function dragLeave(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();

        if (e.target.className.includes("todo_note")) {
            e.target.style.borderBottom = "1px solid var(--input-border-bottom)"

        }
    }
    function dragEnd(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.target.style.opacity = 1
    }
    function drop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();

        if (e.target.className.includes("todo_note")) {
            e.target.style.borderBottom = "1px solid var(--input-border-bottom)"
            const elementDragged = e.dataTransfer.getData("text").split(",");
            // const noteFiltered = filteredNotes
            const newNotes:Notes = JSON.parse(JSON.stringify(notes));
            const elementsToChange = [{position:e.target.dataset.position,note:notes[e.target.dataset.position]},{position:elementDragged[0],note:notes[parseInt(elementDragged[0])]}]
            newNotes[elementsToChange[0].position] = notes[elementsToChange[1].position];
            newNotes[elementsToChange[1].position] = notes[elementsToChange[0].position];
            setNote(newNotes);
        }

    }
    function toggleTheme() {
        if (theme == "dark") {
            change!("light")
        }
        else {
            change!("dark")
        }
    }
    function handlerKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key == "Enter") {
            addNote()
        }
    }

    function getNoteFiltered(filter: filters = "all") {
        switch (filter) {
            case "all":
                setFilteredNotes(notes)
                setSelected("all")
                setFilter("all")

                    ; break;
            case "active":
                const active = notes.filter((note) => note.state == "active");
                setFilteredNotes(active)
                setSelected("active")

                setFilter("active")
                    ; break;
            case "completed": filter
                const completed = notes.filter((note) => note.state == "completed");
                setFilteredNotes(completed)
                setSelected("completed")

                setFilter("completed")
                    ; break;

        }
    }

    function getActiveNotes() {
        let actived = 0;
        notes.forEach(note => {
            if (note.state == "active") {
                actived += 1
            }
        })
        return actived
    }
    function clearCompleted() {
        const completed = notes.filter((note) => note.state == "active");
        setNote(completed)
    }
    function addNote() {
        if (!valueState) {
            return;
        }
        const value = input.current!.value = ""
        setValueState(value)
        setNote(prev => ([...prev, { id: id, content: valueState, state: "active" }]));

    }

    function removeNote(id: string) {
        const findNote = notes.findIndex(note => note.id == id)
        const newNotes = JSON.parse(JSON.stringify(notes))
        newNotes.splice(findNote, 1);
        setNote(newNotes);
        return;
    }
    function check(id: string) {
        const findNote = notes.findIndex(note => note.id == id)
        const newNotes: Notes = JSON.parse(JSON.stringify(notes))
        if (newNotes[findNote].state == "active") {
            newNotes[findNote].state = "completed"
            setNote(newNotes);
            return;
        }
        newNotes[findNote].state = "active";
        setNote(newNotes);
        console.log(newNotes[findNote].state)
        return;
    }

    return (
        <div className={styles.todo_container}>
            <div className={styles.todo_header}>
                <p className={styles.todo_tittle}>TODO</p>
                <div onClick={toggleTheme}>{theme == "dark" ? <img src="images/icon-sun.svg" alt="" /> : <img src="images/icon-moon.svg" alt="" />}</div>
            </div>
            <div className={styles.todo_input}>
                <div onClick={addNote}><img src="images/icon-check.svg" alt="" className={styles.hidden} /></div>
                <input type="text" placeholder="Create a new todo" ref={input} onChange={() => setValueState(input.current?.value!)} onKeyUp={handlerKeyUp} />
            </div>
            <div className={styles.todo_list}>

                {filteredNotes.map((note, index) => (<div data-position={index} className={styles.todo_note} key={note.id} id={note.id} draggable onDragStart={dragStart} onDragEnd={dragEnd} onDragOver={dragOver} onDragLeave={dragLeave} onDrop={drop}>
                    <div onClick={() => check(note.id)!} ><img src="images/icon-check.svg" alt="" className={note.state == "active" ? styles.hidden : styles.show} /></div>
                    <div className={styles.note_content_wrapper}><p className={`${styles.note_content} ${note.state == "completed" ? styles.done : ""}`} title={note.content}>{note.content}</p></div>
                    <img src="images/icon-cross.svg" alt="" className={styles.icon_close} onClick={() => removeNote(note.id)!} />
                </div>))}
                <div className={styles.todo_footer}>
                    <span className={styles.notes_quantity}>
                        {getActiveNotes()} items left
                    </span>
                    <div className={styles.todo_filter}>
                        <span onClick={() => getNoteFiltered("all")} className={selected == "all" ? styles.selected : ""}>All</span>
                        <span onClick={() => getNoteFiltered("active")} className={selected == "active" ? styles.selected : ""}>Active</span>
                        <span onClick={() => getNoteFiltered("completed")} className={selected == "completed" ? styles.selected : ""}>Completed</span>
                    </div>
                    <button className={styles.todo_footer_btn} onClick={clearCompleted}>Clear Completed</button>
                </div>
            </div>

            <div className={styles.todo_filters}> </div>

        </div>
    )
}