//assets
import SearchIcon from '../assets/search.png';

//css
import '../css/FilterField.css';

function FilterField({filterName,type, placeholder}) {
    return ( 
        <div className='filter_field'>
            <label className="filter_name" htmlFor={filterName} >{filterName}</label>
            <div className="filter">
                <img src={SearchIcon} alt='Icone de pesquisa'/>
                <input type={type} id={filterName} name={filterName} placeholder={placeholder} />
            </div>
        </div>
    );
}

export default FilterField;