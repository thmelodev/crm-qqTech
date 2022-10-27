//css
import '../css/FileUpload.css'

function FileUpload({files,setFiles,className}) {

    const uploadHandler = (evt) =>{
        const newFiles = Array.from(evt.target.files);
        setFiles([...files].concat(newFiles))
    }

    return ( 
        <input className={className} type='file' onChange={uploadHandler} multiple/>
     );
}

export default FileUpload;