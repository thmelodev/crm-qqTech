//assets
import DocIcon from "../assets/doc_icon.png";
import DownloadIcon from "../assets/download_icon.png";
import ImageIcon from "../assets/image_icon.png";
import PdfIcon from "../assets/pdf_icon.png";
import Remove from "../assets/remove_sector.png";

//css
import '../css/File.css';

function File({ file }) {

  const verifyFile =
    file.type == "image/*"
      ? ImageIcon 
      : file.type == "application/pdf"
      ? PdfIcon 
      : DocIcon ;

  return (
    <div className = 'file'>
      <img src={verifyFile} alt="Icone arquivo" />
      <span>{file.name}</span>
    </div>
  );
}

export default File;
