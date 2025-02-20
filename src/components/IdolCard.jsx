import "./IdolCard.css";

export default function IdolCard({name, image}) {
    return (
    <div id="idol-card">
        <img
            id="idol-picture"
            src={image}
            alt="idol"
        />
        <div id="idol-description">
            <h3>{name}</h3>
        </div>
    </div>
    );
};