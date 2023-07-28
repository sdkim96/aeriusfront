import React from 'react';
import './aboutpage.css';
import image1 from '../images/1.webp';
import image2 from '../images/2.webp';


const AboutPage = () => {
    return(
        <div>
            <div className="about-page">
                <div className="section1">
                    <img src={image1} alt="i1" />
                    <div className="text-content">
                        <p className="large-text">Distinction</p>
                        <p className="small-text">
                        Veiyd represents a new horizon 
                        in fashion for those seeking a style imbued with a 
                        distinctive aesthetic. 

                        we specialize in crafting over-fit style garments. 

                        Our brand emphasizes unique silhouettes, 
                        not only disrupting the boundaries of traditional fashion
                        but also exploring bold designs that exceed these boundaries. 

                        In doing so, Veiyd respects the diversity of body shapes, styles, and freedom of expression, 
                        all while offering a modern aesthetic.
                        </p>
                    </div>
                </div>
                <div className="section2">
                    <div className='text-content'>
                        <p className="large-text">Confidence</p>
                        <p className="small-text">
                        Every piece in Veiyd's collection is designed to accentuate the wearer's individuality through designs 
                        that emphasize spatial freedom while never losing grace and sophistication. 
                        This approach makes Veiyd's clothes more than just garments to wear, 
                        but a means to express the wearer's presence and confidence. 
                        For those who enjoy adventurous and unique fashion, 
                        Veiyd's collection will add richness and a distinct feel to your wardrobe. 
                        With Veiyd, the stage is set to narrate and convey your own story 
                        through fashion.
                        </p>
                    </div>
                    <img src={image2} alt="i2"/>
                </div>
            </div>
        </div>
    )
}

export default AboutPage;