import React from "react";
import { productType2, productType1 } from "../../../config/Collection";
import HomeSection from "../HomeSection";
import "./collection.scss";

const CollectionCard = ({item}) => (
    <div
        className="collection-card"
        style={{ backgroundImage: `url(${item.image})` }}
    >
        <div className="collection-card__text">{item.text}</div>
    </div>
);

const Collection = () => {
    return (
        <HomeSection className="collection">
            <div className="title">Collections</div>
            <div className="collection__content">
                <div className="collection__content__col1">
                    {productType1.map((item, index) => (
                        <CollectionCard item={item} key={index} />
                    ))}
                </div>
                <div className="collection__content__col2">
                    {productType2.map((item, index) => (
                        <CollectionCard item={item} key={index} />
                    ))}
                </div>
            </div>
        </HomeSection>
    );
};

export default Collection;
