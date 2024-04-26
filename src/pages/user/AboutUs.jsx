import React from "react";
import WhatsApp from "../../components/WhatsApp";
import Grid from '@mui/material/Grid';

function AboutUs() {


  return (
    <div style={{ paddingLeft: '20px', paddingRight: '20px', marginTop: '40px' }}>
      <h1 style={{ color: 'black', textAlign: 'center', marginBottom: '20px' }}>¿Quienes somos?</h1>
      <p style={{ color: 'black', textAlign: 'center', marginTop: '20px' }}>
        Somos una empresa dedicada a la pintura automotriz con una larga trayectoria en el mercado. Nuestro equipo de expertos se especializa en ofrecer las mejores combinaciones de pinturas para vehículos de todo tipo.
      </p>
      
      {/*Sección Misión y Visión en dos columnas */}
      <Grid container spacing={2} justifyContent="center">
        {/*Misión */}
        <Grid item xs={12} sm={6}>
          <h2 style={{ color: 'black', textAlign: 'center', marginTop: '40px' }}>Misión </h2>
          <p style={{ color: 'black', textAlign: 'center' }}>
          En Colorlucy estamos comprometidos a ser la principal fuente de inspiración y soluciones en el mundo de la pintura automotriz. Nos esforzamos por ofrecer a nuestros clientes una amplia gama de productos de alta calidad y servicios personalizados para satisfacer todas sus necesidades en el proceso de pintado de vehículos. A través de nuestra experiencia y pasión por los colores, buscamos ser un socio confiable y una fuente de creatividad para nuestros clientes, brindándoles las herramientas necesarias para expresar su estilo único en cada proyecto
          </p>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <img src="/pinturas.jpg" alt="Pinturas" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
        </Grid>
        {/*Visión */}
        <Grid item xs={12} sm={6}>
          <h2 style={{ color: 'black', textAlign: 'center', marginTop: '40px' }}> Visión</h2>
          <p style={{ color: 'black', textAlign: 'center' }}>
          Nos visualizamos al 2026 como líderes innovadores en la industria de la pintura automotriz, transformando la forma en que las personas perciben y experimentan el proceso de pintado de vehículos. Con un enfoque centrado en la excelencia y la personalización, aspiramos a ser reconocidos por nuestra capacidad para crear combinaciones de colores únicas que reflejen la individualidad de cada cliente. Buscamos constantemente superar las expectativas, ofreciendo productos y servicios de vanguardia que inspiren la creatividad y fomenten la conexión emocional con los vehículos de nuestros clientes.
          </p>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <img src="/trabajador.jpg" alt="Trabajador" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
        </Grid>
      </Grid>
      {/* <InfoBar /> */}
      <WhatsApp />
    </div>
  )
}

export default AboutUs