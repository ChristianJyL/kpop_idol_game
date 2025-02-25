import "./css/IdolCard.css";

export default function IdolCard({ name, groupName, image, birthDate, height, origin}) {
    return (
        <div id="idol-card">
            <div className="idol-image-wrapper">
                <img src={image} alt="idol" />
            </div>
            <div id="idol-description">
                <h3>{name}</h3>
                <p>{groupName}</p>
                <div className="idol-extra-info">
                    <p><strong>Date de naissance: </strong>{birthDate}</p>
                    <p><strong>Taille:</strong> {height}</p>
                    <p><strong>Age:</strong> {new Date().getFullYear() - new Date(birthDate).getFullYear()}</p>
                    <p><strong>Origine : </strong> {origin}</p>
                </div>
            </div>
        </div>
    );
}