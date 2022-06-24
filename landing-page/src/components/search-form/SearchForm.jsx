import React, { useState } from "react";
import "./searchForm.scss";

const SearchForm = ({ searchByName }) => {
    const [key, setKey] = useState("");

    const handleChange = (event) => {
        setKey(event.target.value);
    };

    const handleSearch = () => {
        searchByName(key);
    }

    return (
        <div className="search">
            <div className="search__wrapper">
                <input
                    type="search"
                    className="search__wrapper__input"
                    placeholder="Search..."
                    value={key}
                    onChange={handleChange}
                />
                <div className="search__wrapper__icon">
                    <i
                        class="bx bx-search-alt"
                        onClick={handleSearch}
                    ></i>
                </div>
            </div>
        </div>
    );
};

export default SearchForm;
