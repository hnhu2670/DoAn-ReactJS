import React from 'react';
import '../resources/css/home.css';

import DoctorHome from '../resources/image/doctorhome.png';
const Home = () => {
    return (
        <>
            <nav className="index">
                <div className="title">
                    <div className='doctorhomeimg'>
                        <img src={DoctorHome} alt="logo" />
                    </div>
                    <div className="content ">
                        {/* <h3>PISCES hospital</h3> */}
                        <h1 className="animated-heading">
                            <span>Bệnh viện PISCES</span>
                        </h1>
                        <p>Nơi chúng tôi chăm sóc sức khỏe và điều trị bệnh nhân với tận tâm và chất lượng cao. Cam kết an toàn, công nghệ tiên tiến và sự lắng nghe để mang lại sự ủng hộ và tin
                            tưởng từ cộng đồng. Sức khỏe của bạn là ưu tiên hàng đầu của chúng tôi.</p>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Home;