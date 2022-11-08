//assets
import SearchIcon from "../assets/search.png";

//css
import "../css/FilterField.css";

function FilterField({
  filterName,
  type,
  placeholder,
  filterState,
  setFilterState,
}) {
  return (
    <div className="filter_field">
      {filterName != undefined ? (
        <label className="filter_name" htmlFor={filterName}>
          {filterName}
        </label>
      ) : null}
      <div className="filter">
        <img src={SearchIcon} alt="Icone de pesquisa" />
        <input
          type={type}
          id={filterName}
          name={filterName}
          placeholder={placeholder}
          onChange={(e) => setFilterState(e.target.value)}
          value={filterState}
        />
      </div>
    </div>
  );
}

export default FilterField;
