import React from "react";
import { Link } from "react-router-dom";
import Image from "../../designLayouts/Image";

const SaleCardComponent = ({ imgUrl }) => {
  console.log(imgUrl);
  return (
    <div className="h-1/2 w-full">
      <Link to="/shop">
        <Image className="h-full w-full object-cover" imgSrc={imgUrl} />
      </Link>
    </div>
  );
};

export default SaleCardComponent;
