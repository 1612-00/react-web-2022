import React from "react";
import "./productList.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import ProductCard from "../product-card/ProductCard";
import HomeSection from "../../HomeSection";

const ProductList = ({ title, listProduct }) => {
    return (
        <HomeSection className="product-list">
            <div className="title">{title}</div>
            <div className="product-list__content">
                <Swiper
                    grabCursor={true}
                    spaceBetween={30}
                    slidesPerView={4}
                    modules={[Pagination, Autoplay]}
                    autoplay={{ delay: 2000 }}
                    pagination={{
                        clickable: true
                    }}
                    loop={true}
                    breakpoints={{
                        1400: {
                            spaceBetween: 30,
                            slidesPerView: 4
                        },
                        1220: {
                            spaceBetween: 30,
                            slidesPerView: 3
                        },
                        850: {
                            spaceBetween: 10,
                            slidesPerView: 3
                        },
                        550: {
                            spaceBetween: 10,
                            slidesPerView: 2
                        },
                        0: {
                            spaceBetween: 10,
                            slidesPerView: 1
                        }
                    }}
                >
                    {listProduct.map((item, index) => (
                        <SwiperSlide key={index}>
                            <ProductCard data={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </HomeSection>
    );
};

export default ProductList;
