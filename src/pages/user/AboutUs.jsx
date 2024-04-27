import React from "react";
import WhatsApp from "../../components/WhatsApp";
import Grid from '@mui/material/Grid';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
function AboutUs() {
  return (
    <div style={{ margin: '4%' }}>
      
      <Grid container  justifyContent="center">
        <h1 style={{ color: 'black' }}>¿Quiénes somos?</h1>
      </Grid>
      
      <Grid container spacing={2} justifyContent="center" style={ {marginTop: '1%'} }>

        <Grid item xs={12} sm={6}  >
          <p style={{ color: 'black' }}>
            Somos una empresa líder en el sector de pinturas automotrices en la ciudad de Cali, está ubicada en el centro de la ciudad, ofrecemos una amplia gama de productos especializados para el proceso de pintado de vehículos y combinación de colores personalizados. Con un enfoque centrado en la calidad y la innovación, Colorlucy se ha ganado la confianza de clientes y profesionales de la industria por igual
          </p>
         {/* Iconos con información de la empresa */}
         <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
            <WhatsAppIcon />
            <a href="https://api.whatsapp.com/send/?phone=%2B573155176725&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '10px', color: 'black', textDecoration: 'none' }}>+57 315 5176725</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
            <InstagramIcon />
            <a href="https://www.instagram.com/pinturas_colorlucy/" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '10px', color: 'black', textDecoration: 'none' }}>@pinturas_colorlucy</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
            <FacebookIcon />
            <a href="https://www.facebook.com/PinturasColorlucy?locale=es_LA" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '10px', color: 'black', textDecoration: 'none' }}>Color Lucy</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
            <EmailIcon />
            <span style={{ marginLeft: '10px', color: 'black' }}>Colorlucy12@gmail.com</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
            <LocationOnIcon />
            <span style={{ marginLeft: '10px', color: 'black' }}>Cra 16 #10-93 barrio Bretaña</span>
          </div>
        </Grid>
        {/*Mapa*/}
        <Grid item xs={12} sm={6}  >
          <div style={{ marginLeft: '2%', marginRight: '2%', maxWidth: '100%' }}>
            <iframe
              title="Ubicación de la empresa"
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3980.730005614444!2d-76.52986068568234!3d3.425101302655551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e300f0cb8a0f13d%3A0x890f75af25a03b40!2sCra.%2016%20%2310-93%2C%20Cali%2C%20Valle%20del%20Cauca%2C%20Colombia!5e0!3m2!1sen!2sus!4v1648893824868!5m2!1sen!2sus`}
              width="100%"
              height="320"
              style={{ border: 0, borderRadius: '8px' }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </Grid>
      </Grid>

      {/* Sección Misión y Visión */}
      <Grid container spacing={2} justifyContent="center" >
        {/* Misión */}
        <Grid item xs={12} sm={6}>
          <h2 style={{ color: 'black', textAlign: 'center', marginTop: '40px' }}>Misión </h2>
          <p style={{ color: 'black', textAlign: 'justify' }}>
            En Colorlucy estamos comprometidos a ser la principal fuente de inspiración y soluciones en el mundo de la pintura automotriz. Nos esforzamos por ofrecer a nuestros clientes una amplia gama de productos de alta calidad y servicios personalizados para satisfacer todas sus necesidades en el proceso de pintado de vehículos. A través de nuestra experiencia y pasión por los colores, buscamos ser un socio confiable y una fuente de creatividad para nuestros clientes, brindándoles las herramientas necesarias para expresar su estilo único en cada proyecto
          </p>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <img src="/pinturas.jpg" alt="Pinturas" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
        </Grid>
        {/* Visión */}
        <Grid item xs={12} sm={6}>
          <h2 style={{ color: 'black', textAlign: 'center', marginTop: '40px' }}>Visión</h2>
          <p style={{ color: 'black', textAlign: 'justify' }}>
          Nos visualizamos al 2026 como líderes innovadores en la industria de la pintura automotriz, transformando la forma en que las personas perciben y experimentan el proceso de pintado de vehículos. Centrados en la excelencia y la personalización, aspiramos a ser reconocidos por nuestra capacidad para crear combinaciones de colores únicas que reflejen la individualidad de cada cliente. Buscamos constantemente superar las expectativas, ofreciendo productos y servicios de vanguardia que inspiren la creatividad y fomenten la conexión emocional con los vehículos de nuestros clientes.  
          </p>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <img src="/trabajador.jpg" alt="Trabajador" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
        </Grid>
      </Grid>
      
      <WhatsApp />
    </div>
  )
}

export default AboutUs