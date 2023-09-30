import React, { useState } from 'react';

const MyComponent = () => {
    // const [selectedOptions, setSelectedOptions] = useState([]);
    // const [sheduleDetail, setSheduleDetail] = useState({
    //     listDate1: selectedOptions,

    // })
    // console.log("lisst date" + sheduleDetail.listDate1)

    // const handleCheckboxChange = (event) => {
    //     const value = event.target.value;
    //     const isChecked = event.target.checked;

    //     if (isChecked) {
    //         setSelectedOptions([...selectedOptions, value]);
    //     } else {
    //         setSelectedOptions(selectedOptions.filter(option => option !== value));
    //     }

    // };
    // console.log(selectedOptions)
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [sheduleDetail, setSheduleDetail] = useState({
        listDate1: selectedOptions,
    });

    console.log("list date: " + sheduleDetail.listDate1);

    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedOptions([...selectedOptions, value]);
        } else {
            setSelectedOptions(selectedOptions.filter((option) => option !== value));
        }
    };

    console.log(selectedOptions);
    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    value="option1"
                    checked={selectedOptions.includes('option1')}
                    onChange={handleCheckboxChange}
                />
                Option 1
            </label>
            <label>
                <input
                    type="checkbox"
                    value="option2"
                    checked={selectedOptions.includes('option2')}
                    onChange={handleCheckboxChange}
                />
                Option 2
            </label>
            <label>
                <input
                    type="checkbox"
                    value="option3"
                    checked={selectedOptions.includes('option3')}
                    onChange={handleCheckboxChange}
                />
                Option 3
            </label>
        </div>
    );
};

export default MyComponent;