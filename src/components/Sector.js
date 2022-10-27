import '../css/SectorAndSystem.css'

function Sector({sector,setoresEnvolvidos, setSetoresEnvolvidos}) {
    
  function teste() {
    const checkbox = document.getElementById(`${sector}`);
    if(checkbox.checked){
      setSetoresEnvolvidos([...setoresEnvolvidos,sector])
    }else{
      setSetoresEnvolvidos(setoresEnvolvidos.filter((sectorName) => sectorName != sector))
    }
  }

  function readOnly(evt){evt.preventDefault()}

  return (
    <div className='div_sector'>
      {sector == 'TI'
      ?(<input className='ti' id={sector} type='checkbox' value={sector} defaultChecked onClick={readOnly}/>)
      : (<input onChange={teste} id={sector} type='checkbox' value={sector}/>)}
      <label htmlFor={sector}>{sector}</label>
    </div>
  );
}

export default Sector;
