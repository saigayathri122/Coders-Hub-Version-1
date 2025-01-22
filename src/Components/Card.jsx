// import React from "react";
// import "../Styles/Card.css";

// function Card({ link, imgSrc, alt, title }) {
//     return (
//         <div className="column">
//             <div className="caption">
//                 <a href={link}>
//                     <img src={imgSrc} alt={alt} width="100px" height="100px" />
//                 </a>
//                 <h3 className="item">
//                     <a href={link} style={{ color: 'white', textDecoration: 'none' }}>{title}</a>
//                 </h3>
//             </div>
//         </div>
//     );
// }

// export default Card;

import React from "react";
import "../Styles/Card.css";

function Card({ imgSrc, alt, title }) {
  return (
    <div className="column">
      <img src={imgSrc} alt={alt} width="100px" height="100px"/>
      <div className="caption" style={{ color: 'white', textDecoration: 'none' }}>{title}</div>
    </div>
  );
}

export default Card;

