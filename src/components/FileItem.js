//assets
import DocIcon from "../assets/doc_icon.png";
import DownloadIcon from "../assets/download_icon.png";
import ImageIcon from "../assets/image_icon.png";
import PdfIcon from "../assets/pdf_icon.png";
import Remove from "../assets/remove_sector.png";

//css
import "../css/File.css";

function FileItem({ file, onClick }) {
  const verifyFile =
    file.name.includes("jpeg") || file.name.includes("jpg")
      ? ImageIcon
      : file.name.includes("pdf")
      ? PdfIcon
      : DocIcon;

  return (
    <div className={`file ${JSON.stringify(file)}`} onClick={onClick}>
      <img className={JSON.stringify(file)} src={verifyFile} alt="Icone arquivo" />
      <span className={JSON.stringify(file)}>{file.name}</span>
    </div>
  );
}

export default FileItem;
