import React from 'react'
import Chaimanzana from '../../../assets/invitations/lniuat2024/footer/chaimanzana.svg'

const Footer = () => {
    return (
        <div className="footer text-center px-6 bg-white">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center py-8">
                {/* Texto alineado a la izquierda y ocupando más espacio */}
                <div className="flex-[3] text-left text-[#97989D]">
                    <p className='font-playfair text-lg leading-none'>
                        Esta invitación fue diseñada y programada por <br /> Estudio creativo chaimanzana
                    </p>
                </div>

                {/* Imagen alineada a la derecha y ocupando menos espacio */}
                <div className="flex-[1] text-right">
                    <a href="https://www.instagram.com/chaimanzana_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
                        <img src={Chaimanzana} alt="chaimanzana" className='inline-block' />
                    </a>
                </div>
            </div>
        </div>

    )
}

export default Footer