import RemoveSector from "../assets/remove_sector.png";
import '../css/SectorSelected.css'

function SectorSelected({sector}) {
  return (
    <div className="div_sector">
      <span className="sector_name">{sector}</span>
      <button className="remove_sector">
        <img src={RemoveSector} />
      </button>
    </div>
  );
}

export default SectorSelected;
