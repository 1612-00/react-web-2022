import React, { useState } from 'react';
import './profileTab.scss';

const MyProfileTab = ({ user }) => {
    const myProfileData = [
        {
            title: 'Full Name',
            data: user.fullName,
        },
        {
            title: 'Email',
            data: user.email,
        },
        {
            title: 'Phone Number',
            data: user.phoneNumber,
        },
        {
            title: 'Address',
            data: user.address,
        },
        {
            title: 'Date Of Birth',
            data: user.dob,
        },
    ];

    return (
        <div className='form-input'>
            <div className='box-title'>My Profile</div>
            <div className='form-input__content'>
                {myProfileData.map((item, index) => (
                    <div key={index} className='form-input__content__item'>
                        <div className='form-input__content__item__text'>
                            {item.title}
                        </div>
                        <input
                            className='form-input__content__item__input'
                            value={item.data}
                            disabled
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

const EditProfileTab = ({ user, updateInfo }) => {
    const editProfileData = [
        {
            title: 'Full Name',
            data: user.fullName,
            disabled: false,
        },
        {
            title: 'Email',
            data: user.email,
            disabled: true,
        },
        {
            title: 'Phone Number',
            data: user.phoneNumber,
            disabled: false,
        },
        {
            title: 'Address',
            data: user.address,
            disabled: false,
        },
        {
            title: 'Date Of Birth',
            data: user.dob,
            disabled: false,
        },
    ];

    const [value, setValue] = useState(editProfileData);

    const handleChangeInput = (event, index) => {
        const newValue = structuredClone(value);

        newValue[index].data = event.target.value;

        setValue(newValue);
    };

    const handleUpdateInfo = async () => {
        const userUpdate = {
            fullName: value[0].data,
            phoneNumber: value[2].data,
            address: value[3].data,
            dob: value[4].data,
        };
        const res = await updateInfo(userUpdate);
        console.log(res);
    };

    return (
        <div className='form-input'>
            <div className='box-title'>Edit Profile</div>
            <div className='form-input__content'>
                {value.map((item, index) => (
                    <div key={index} className='form-input__content__item'>
                        <div className='form-input__content__item__text'>
                            {item.title}
                        </div>
                        <input
                            className='form-input__content__item__input'
                            value={value[index].data}
                            placeholder={`Enter ${item.title}`}
                            onChange={(e) => handleChangeInput(e, index)}
                            type='text'
                            disabled={item.disabled === true ? true : false}
                        />
                    </div>
                ))}
            </div>
            <div className='form-input__btnUpdate'>
                <button onClick={handleUpdateInfo}>Update</button>
            </div>
        </div>
    );
};

const ResetPasswordPage = () => {
    const resetPasswordData = [
        { text: 'Old Password', type: 'text' },
        { text: 'New Password', type: 'text' },
        { text: 'Confirm Password', type: 'text' },
    ];

    return (
        <div className='form-input'>
            <div className='box-title'>Edit Profile</div>
            <div className='resetPass'>
                {resetPasswordData.map((item, index) => (
                    <div key={index} className='resetPass__item'>
                        <div className='resetPass__text'>{item.text}</div>
                        <input
                            className='form-input__content__item__input'
                            type={item.type}
                        />
                    </div>
                ))}
            </div>
            <div className='form-input__btnUpdate'>
                <button>Update</button>
            </div>
        </div>
    );
};

const ProfileTab = ({ tabChoose, user, updateInfo }) => {
    if (tabChoose === 0) {
        return <MyProfileTab user={user} />;
    } else if (tabChoose === 1) {
        return <EditProfileTab user={user} updateInfo={updateInfo} />;
    } else if (tabChoose === 2) {
        return <ResetPasswordPage />;
    }
};

export default ProfileTab;
