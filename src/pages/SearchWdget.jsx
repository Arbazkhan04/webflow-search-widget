import { useState, useEffect } from "react";
import SearchModal from "./SearchModal";
import { useDisclosure } from "@chakra-ui/react";
import { search } from "../apiManager/search";
import { getSearchPreference } from "../apiManager/setting";

const SearchWidget = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]); // State to hold search results
  const [searchPreference, setSearchPreference] = useState(null); // State to hold search preferences

  const { isOpen, onClose, onOpen } = useDisclosure();


  useEffect(() => {
    const fetchSearchPreference = async () => {
      const userId = "6767d5c65ac4ffa5809355f3";
      const siteId = "6768b69f5fe75864249a7ce5";

      try {
        const preferences = await getSearchPreference(userId, siteId);
        setSearchPreference(preferences?.data);
        console.log("Search Preferences:", preferences?.data);
      } catch (error) {
        console.error("Error fetching search preferences:", error);
      }
    };

    fetchSearchPreference();
  }, []); // Fetch search preferences on component mount

  const handleSearch = async (searchQuery) => {
    const userId = "6767d5c65ac4ffa5809355f3";
    const siteId = "6768b69f5fe75864249a7ce5";

    try {
      // Call the search API
      const data = await search(searchQuery, userId, siteId);

      // Update search results state
      setSearchResults(data?.data);

      console.log("Search API Response:", data?.data);
    } catch (error) {
      console.error("Error calling search API:", error);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Trigger API call if the query length is 3 or more
    if (value.length >= 3) {
      handleSearch(value);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "30px",
        right: 0,
        background: "#fff",
        padding: "10px",
        zIndex: 1000,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        alignItems: "end",
        width: "40%",
      }}
    >
      {/* Pass the query and other props to SearchModal */}
      {
        searchPreference?.searchEngineSettings?.instantSearchWidget &&
        <SearchModal
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          searchResults={searchResults}
          handleSearch={handleSearch}
          searchQuery={query}
          setSearchQuery={setQuery}
          initialQuery={query} // Pass query as initialQuery
          instantSearchWidgetCustomization={searchPreference?.instantSearchWidgetCustomization}
        />
      }

      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        onClick={() => {
          onOpen();
        }}
        style={{
          padding: "10px",
          width: "75%",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      <button
        onClick={() => handleSearch(query)}
        style={{
          padding: "10px",
          marginLeft: "10px",
          borderRadius: "4px",
          background: "#007BFF",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchWidget;
