import React, { useState } from 'react';
import { useMutation } from '@apollo/client'
import { addBookMutation, getBooksQuery } from "../queries/queries"


function AddBook() {
    const [addBook, { data }] = useMutation(addBookMutation)

    const [name, setname] = useState("");
    const [genre, setgenre] = useState("");
    const [authorId, setauthorId] = useState("");

    const formSubmit = (e) => {
        e.preventDefault();
        addBook ({ variables:{
            name: name,
            genre: genre,
            authorId: authorId
        },
        refetchQueries: [{query: getBooksQuery}]
        });
    }

    return (
        <form id="add-book" onSubmit={formSubmit}>
            <div className="field">
                <label>Book name: </label>
                <input type="text" value={name} onChange={(e)=>{setname(e.target.value)}}/>
            </div>
            <div className="field">
                <label>Genre: </label>
                <input type="text" value={genre} onChange={(e)=>{setgenre(e.target.value)}}/>
            </div>
            <div className="field">
                <label>Author: </label>
                <select value={authorId} onChange={(e)=>{setauthorId(e.target.value)}}>
                    <option>Select Author</option>
                    <option value="1">a1</option>
                    <option value="2">a2</option>
                    <option value="3">a3</option>
                </select>
            </div>
            <button>+</button>
        </form>
    )
}

export default AddBook;