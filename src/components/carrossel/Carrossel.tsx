// Importando os Componentes Swiper React
import { Swiper, SwiperSlide } from "swiper/react";

// Importando os estilos Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Importando SEU CSS
import "./Carrossel.css";

// Importando Modulos do Carrossel
import { Navigation, Pagination } from 'swiper/modules';

function Carrossel() {

    var items = [
        { img: "https://cdn.discordapp.com/attachments/1262942566370775061/1276494448234070057/vincent-van-zalinge-oBL5QRAxZzo-unsplash.jpg?ex=66c9bb98&is=66c86a18&hm=8b8fd6eb04238c88303f2617b92a5368d009f3536d44ace099f6a17ffebf9c85&" },
        { img: "https://cdn.discordapp.com/attachments/1262942566370775061/1276542586764656712/Leonardo_Phoenix_Create_a_vibrant_packaging_design_featuring_a_1.jpg?ex=66c9e86d&is=66c896ed&hm=5513df9041c4722ce234e85fd6207e4eb35b1430a16fcba277bf6a1aac8f628f&" },
        { img: "https://cdn.discordapp.com/attachments/1262942566370775061/1276494450348003369/markus-spiske-O70hwncRDC8-unsplash.jpg?ex=66c9bb99&is=66c86a19&hm=01d2dc09a762545c61f35c15886ff485b2364459520bc3c7656dfeaedb1465ba&" },
        { img: "https://cdn.discordapp.com/attachments/1262942566370775061/1276543165695791228/Leonardo_Phoenix_Create_a_vibrant_and_eyecatching_packaging_de_1.jpg?ex=66c9e8f7&is=66c89777&hm=0eb20c0cc38a3096254bb85dd2b24bc8e2671e6071fab77817c4d85bab4cf3ca& "},
        { img: "https://cdn.discordapp.com/attachments/1262942566370775061/1276496904317964288/odiseo-castrejon-1CsaVdwfIew-unsplash.jpg?ex=66c9bde2&is=66c86c62&hm=ec41fd437add34edb081ddb44986d2c3186940924e35776addc60cf2e3fdf3dc&" },
        { img: "https://cdn.discordapp.com/attachments/1262942566370775061/1276545587399102555/Leonardo_Phoenix_Create_a_highresolution_PNG_image_with_a_tran_0.jpg?ex=66c9eb39&is=66c899b9&hm=178e7d7eefbe20ff00405efff17d2ed241f90a0ee5e8f2ef9b857c824f033b82&" },
        { img: "https://cdn.discordapp.com/attachments/1262942566370775061/1276496906960371722/juan-jose-valencia-antia-TTrJMhrkoeY-unsplash.jpg?ex=66c9bde2&is=66c86c62&hm=01911f654f4b0b483f1841ebdd080190a3707ac69ef3c5455a5aa18560e2f3d2&" },
        { img: "https://cdn.discordapp.com/attachments/1262942566370775061/1276496908130455645/arturrro-GdTLaWamFHw-unsplash.jpg?ex=66c9bde3&is=66c86c63&hm=aa1a554caddc120925a706f3148af456bbdaa83d1d5908fbc11698f5a1002f1c&" },
    ]

    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                    clickable: true,
                    dynamicBullets: true
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >

                {
                    items.map((item) => (

                        <SwiperSlide>
                            <img src={item.img} alt="Imagem" />
                        </SwiperSlide>
                        
                    ))
                }

            </Swiper>
        </>
    )
}

export default Carrossel