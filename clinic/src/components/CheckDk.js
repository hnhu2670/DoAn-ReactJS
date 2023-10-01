// import React, { useState } from 'react';

// const MyComponent = () => {
//     // const [selectedOptions, setSelectedOptions] = useState([]);
//     // const [sheduleDetail, setSheduleDetail] = useState({
//     //     listDate1: selectedOptions,

//     // })
//     // console.log("lisst date" + sheduleDetail.listDate1)

//     // const handleCheckboxChange = (event) => {
//     //     const value = event.target.value;
//     //     const isChecked = event.target.checked;

//     //     if (isChecked) {
//     //         setSelectedOptions([...selectedOptions, value]);
//     //     } else {
//     //         setSelectedOptions(selectedOptions.filter(option => option !== value));
//     //     }

//     // };
//     // console.log(selectedOptions)
//     const [selectedOptions, setSelectedOptions] = useState([]);
//     const [sheduleDetail, setSheduleDetail] = useState({
//         listDate1: selectedOptions,
//     });

//     console.log("list date: " + sheduleDetail.listDate1);

//     const handleCheckboxChange = (event) => {
//         const value = event.target.value;
//         const isChecked = event.target.checked;

//         if (isChecked) {
//             setSelectedOptions([...selectedOptions, value]);
//         } else {
//             setSelectedOptions(selectedOptions.filter((option) => option !== value));
//         }
//     };

//     console.log(selectedOptions);
//     return (
//         <div>
//             <label>
//                 <input
//                     type="checkbox"
//                     value="option1"
//                     checked={selectedOptions.includes('option1')}
//                     onChange={handleCheckboxChange}
//                 />
//                 Option 1
//             </label>
//             <label>
//                 <input
//                     type="checkbox"
//                     value="option2"
//                     checked={selectedOptions.includes('option2')}
//                     onChange={handleCheckboxChange}
//                 />
//                 Option 2
//             </label>
//             <label>
//                 <input
//                     type="checkbox"
//                     value="option3"
//                     checked={selectedOptions.includes('option3')}
//                     onChange={handleCheckboxChange}
//                 />
//                 Option 3
//             </label>
//         </div>
//     );
// };

// export default MyComponent;
import React, { useState } from 'react';

const CheckDK = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedOptions([...selectedOptions, value]);
        } else {
            setSelectedOptions(selectedOptions.filter((option) => option !== value));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Gửi dữ liệu selectedOptions lên server
        // ... Gọi API hoặc xử lý dữ liệu tại đây ...

        // Xóa các ngày đã chọn sau khi gửi lên server
        setSelectedOptions([]);
    };

    return (
        <div>
            <h2>Đăng ký lịch làm việc</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="checkbox"
                        value="Monday"
                        checked={selectedOptions.includes('Monday')}
                        onChange={handleCheckboxChange}
                    />
                    Thứ 2
                </label>
                <br />
                <label>
                    <input
                        type="checkbox"
                        value="Tuesday"
                        checked={selectedOptions.includes('Tuesday')}
                        onChange={handleCheckboxChange}
                    />
                    Thứ 3
                </label>
                <br />
                <label>
                    <input
                        type="checkbox"
                        value="Wednesday"
                        checked={selectedOptions.includes('Wednesday')}
                        onChange={handleCheckboxChange}
                    />
                    Thứ 4
                </label>
                <br />
                <label>
                    <input
                        type="checkbox"
                        value="Thursday"
                        checked={selectedOptions.includes('Thursday')}
                        onChange={handleCheckboxChange}
                    />
                    Thứ 5
                </label>
                <br />
                <label>
                    <input
                        type="checkbox"
                        value="Friday"
                        checked={selectedOptions.includes('Friday')}
                        onChange={handleCheckboxChange}
                    />
                    Thứ 6
                </label>
                <br />
                <button type="submit">Đăng ký</button>
            </form>
        </div>
    );
};

export default CheckDK;