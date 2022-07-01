import useLocationForm from "./useLocationForm";
import Select from "react-select";
import Button from "../button/Button";
import "./locationForm.scss";

const LocationForm = ({ onChangeAddress }) => {
    const { state, onCitySelect, onDistrictSelect } = useLocationForm(true);

    const { cityOptions, districtOptions, selectedCity, selectedDistrict } =
        state;

    const onSubmit = (e) => {
        e.preventDefault();
        onChangeAddress(
            state.selectedDistrict.label + ", " + state.selectedCity.label
        );
    };

    return (
        <form onSubmit={onSubmit} className="location-form">
            <div className="location-form__wrapper">
                <Select
                    className="location-form__item"
                    name="cityId"
                    key={`cityId_${selectedCity?.value}`}
                    isDisabled={cityOptions.length === 0}
                    options={cityOptions}
                    onChange={(option) => onCitySelect(option)}
                    placeholder="Tỉnh/Thành"
                    defaultValue={selectedCity}
                />

                <Select
                    className="location-form__item"
                    name="districtId"
                    key={`districtId_${selectedDistrict?.value}`}
                    isDisabled={districtOptions.length === 0}
                    options={districtOptions}
                    onChange={(option) => onDistrictSelect(option)}
                    placeholder="Quận/Huyện"
                    defaultValue={selectedDistrict}
                />
            </div>

            <Button type="submit" className="btn-second btn-sm">
                Update
            </Button>
        </form>
    );
};

export default LocationForm;
