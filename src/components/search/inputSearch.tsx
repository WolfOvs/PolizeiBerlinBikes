import React, { useState } from 'react';

interface SearchProps {
  onSearch: (searchTerm: string) => void;
}

const SearchInput: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearchSubmit} className='search-form'>
      <input placeholder="Search by title..." className="input-search mr-2" type="text" value={searchTerm} onChange={handleSearchChange} />
      <button className="button-primary mr-2" type="submit">Search</button>
    </form>
  );
};

export default SearchInput;