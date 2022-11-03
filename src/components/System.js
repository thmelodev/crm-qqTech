import '../css/SectorAndSystem.css'

function System({system,sistemasEnvolvidos, setSistemasEnvolvidos,defaultChecked,readOnly}) {
    
  function teste() {
    const checkbox = document.getElementById(`${system}`);
    if(checkbox.checked){
        setSistemasEnvolvidos([...sistemasEnvolvidos,system])
    }else{
        setSistemasEnvolvidos(sistemasEnvolvidos.filter((sectorName) => sectorName != system))
    }
  }

  function isReadOnly(){
    if (!!readOnly && readOnly == true) {
      const divInput = document.getElementsByClassName(`div_sector_${system} div_sector`);
      if(!!divInput[0]){
          divInput[0].style.opacity = 0.8
          divInput[0].children[0].style.cursor = 'default'
        }
      }
    return readOnly;
  }

  return (
    <div className={`div_sector_${system} div_sector`}>
      <input onChange={teste} id={system} type='checkbox' value={system} defaultChecked={defaultChecked} disabled={isReadOnly()}/>
      <label htmlFor={system}>{system}</label>
    </div>
  );
}

export default System;
