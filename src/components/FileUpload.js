//css
import '../css/FileUpload.css'

function FileUpload({files,setFiles,className}) {
    
    const uploadHandler = (evt) =>{
        const file = evt.target.files[0];
        setFiles([...files,file])
        console.log(files)
    }

    return ( 
        <input className={className} type='file' onChange={uploadHandler}/>
     );
}

export default FileUpload;