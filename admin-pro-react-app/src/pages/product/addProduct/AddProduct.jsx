import React, { useContext, useState } from 'react';
import './addProduct.scss';
import ProductItem from '../../../components/productItem/ProductItem';
import { ProductContext } from './../../../contexts/ProductContext';
import { productAddFormData } from './../../../configs/productData';

const ProductAddTab = ({ enterNewProduct }) => {
    // Product Context
    const {
        addProduct,
    } = useContext(ProductContext);

    const [value, setValue] = useState(productAddFormData);
    const newValue = structuredClone(value);

    const handleChangeInput = (event, index) => {
        if (index === 0) {
            newValue[index].data = event.target.files[0];
            enterNewProduct(newValue[index].section, event.target.files[0]);
        } else {
            newValue[index].data = event.target.value;
            enterNewProduct(newValue[index].section, event.target.value);
        }

        setValue(newValue);
    };

    const handleSubmitForm = async () => {
        const formData = new FormData()
        formData.append("image", newValue[0].data)
        formData.append("name", newValue[1].data)
        formData.append("price", newValue[2].data)
        formData.append("discount", newValue[3].data)
        await addProduct(formData);
    }

    return (
        <div className='form-input'>
            <div className='box-title'>Add product</div>
            <div className='form-input__content grid-1-column'>
                {productAddFormData.map((item, index) => (
                    <div key={index} className='form-input__content__item'>
                        <div className='form-input__content__item__title'>
                            {item.title}
                        </div>
                        <input
                            type={item.type}
                            name={item.section}
                            min={item.type === "number" ? 1 : undefined}
                            step={item.type === "number" ? 1 : undefined}
                            value={index !== 0 ? value[index].data : undefined}
                            className={`form-input__content__item__input ${item.type}`}
                            onChange={(e) => handleChangeInput(e, index)}
                        />
                    </div>
                ))}
            </div>
            <div className='form-input__btnUpdate'>
                <button onClick={handleSubmitForm}>Add</button>
            </div>
        </div>
    );
};

const AddProduct = () => {
    const [newProduct, setNewProduct] = useState({
        image: '',
        name: 'Product name',
        total: '0',
        price: '0',
    });

    const enterNewProduct = (key, value) => {
        if (key === 'image') {
            setNewProduct({ ...newProduct, image: value });
        }
        if (key === 'name') {
            setNewProduct({ ...newProduct, name: value });
        }
        if (key === 'total') {
            setNewProduct({ ...newProduct, total: value });
        }
        if (key === 'price') {
            setNewProduct({ ...newProduct, price: value });
        }
    };

    return (
        <div className='productAdd main-page'>
            <div className='productAdd__wrapper'>
                <div className='productAdd__form box-item-layout'>
                    <ProductAddTab enterNewProduct={enterNewProduct} />
                </div>
                <div className="productAdd__show box-item-layout">
                    <ProductItem title='Show product' item={newProduct} formTest={true} />
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
