import React from "react";
import styled from "styled-components";

const Search = styled.div`
  display: flex;
  width: 100%;
  align-items: center; 
  justify-content: flex-end;
  margin: 0.5rem 0;
`;
const SearchCount = styled.div`
  background-color: #06C;
  color: #FFF;
  border-radius: 0.2rem;
  padding: 0.1rem 0.3rem;
  margin: 0 0.5rem;
  font-weigth: bold;
  font-size: 0.9rem;
`;
const SearchInput = styled.input`
  border: 1px solid #CCC;
  border-radius: 0.2rem;
  font-size: 1rem;
  padding: 0.1rem;
  margin-right: 1rem;
`;

export interface SearchBarProps {
  count: number;
  setSearching: (searching: string) => void;
}

export function SearchBar (props: SearchBarProps) {
  const { count, setSearching } = props;

  const handleSearch = (e: any) => {
    const searching = e.target.value;
    setSearching(searching);
  }

  return (
    <Search>
      {count !== undefined && (
        <SearchCount>{count}</SearchCount>
      )}
      <div>
        <SearchInput
          type="text"
          placeholder="Filter podcasts..."
          onChange={handleSearch}
        />
      </div>
    </Search>
  );
};

export default SearchBar;
