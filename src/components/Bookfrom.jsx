import { useState, useEffect } from "react";
import PropType from 'prop-types';

const BookFrom = ({ book, OnSave, OnBack }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');

    useEffect(() => {
        if (book) {
            setTitle(book.title);
            setAuthor(book.author);
        }
    }, [book]);

    const handleSubmit = (e) => {
        e.preventDefaual();
        OnSave({ id: book ? book.id : null, title,author });
    };

    return (
        <div>
            <h1>{book ? 'Edit Book' : 'Create Book'}</h1>
            <from onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Author:</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>
                <button type="submit">Save</button>
            </from>
            <div className="button-container">
                <button onClick={onclick}>Back to List</button>
            </div>
        </div>
    );
};

BookFrom.PropType = {
    book: PropTypes.object,
    OnSave: PropType.func.isRequires,
    onBack: PropType.func.isRequired,
};

export default BookFrom;