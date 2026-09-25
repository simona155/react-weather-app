function SearchBar({
    value,
    onChange,
    onSearch,
    placeholder = 'Search for a city...'
}) {
    return (
        <div className="search-box d-flex w-100">
            <input
                className="form-control"
                type="text"
                value={value}
                onChange={onChange}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        onSearch();
                    }
                }}
                placeholder={placeholder}
            />

            <button
                className="btn btn-primary"
                onClick={onSearch}
            >
                Search
            </button>
        </div>
    );
}

export default SearchBar;