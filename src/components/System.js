import '../css/SectorAndSystem.css'

function System({system,sistemasEnvolvidos, setSistemasEnvolvidos}) {
    
  function teste() {
    const checkbox = document.getElementById(`${system}`);
    if(checkbox.checked){
        setSistemasEnvolvidos([...sistemasEnvolvidos,system])
    }else{
        setSistemasEnvolvidos(sistemasEnvolvidos.filter((sectorName) => sectorName != system))
    }
  }

  return (
    <div className='div_sector'>
      <input onChange={teste} id={system} type='checkbox' value={system}/>
      <label htmlFor={system}>{system}</label>
    </div>
  );
}

export default System;
