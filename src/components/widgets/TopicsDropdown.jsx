import React, { useState, useRef, useEffect } from 'react'

// Links reales del sistema
const TOPIC_LINKS = {
  'socio-politicos': [
    { text: 'Los planos de la paz', href: '/losplanosdelapaz' },
    { text: 'Revolución científico tecnológica parte I', href: '/revolucioncientificotecnologica' },
    { text: 'Revolución científico tecnológica parte II', href: '/revolucioncientificotecnologicaparteii' },
    { text: 'Revolución científico tecnológica parte III', href: '/revolucioncientificotecnologicaparteiii' },
    { text: 'Decálogo de la paz', href: '/decalogodelapaz' },
    { text: 'Ideología del libertador', href: '/ideologiadellibertador' },
    { text: 'Convocatoria a la intelectualidad', href: '/convocatoriaalaintelectualidad' },
    { text: 'Plan de salvación nacional', href: '/plandesalvacionnacional' },
    { text: 'Libros', href: '/category/libro' }
  ],
  'socio-cientificos': [
    { text: 'Psicoanálisis y Pedagogía Formativa', href: '/psicoanilisyeducacionformativa' },
    { text: 'Propuesta de reforma académica', href: '/propuestadereformaacademica' },
    { text: 'La parranda como identidad', href: '/parrandalatinoamericana' },
    { text: 'La Realización Personal', href: '/realizacionpersonal' },
    { text: 'Como ganar el premio Nobel', href: '/premionobel' },
    { text: 'Libros', href: '/category/libro' }
  ]
};

// Componentes de iconos SVG
const CurrencyDollarIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
  </svg>
);

const BookIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const BulbIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const TopicsDropdown = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef({});

  // Función para obtener el componente de icono
  const getIconComponent = (iconType) => {
    switch (iconType) {
      case 'currency-dollar':
        return CurrencyDollarIcon;
      case 'book':
        return BookIcon;
      case 'bulb':
        return BulbIcon;
      default:
        return CurrencyDollarIcon;
    }
  };

  // Definición completa de temas relacionados
  const topicLinks = [
    { 
      text: 'SOCIO-POLÍTICOS Y ECONÓMICOS', 
      href: '/politica', 
      icon: 'currency-dollar',
      sublinks: TOPIC_LINKS['socio-politicos']
    },
    { 
      text: 'SOCIO-CIENTÍFICOS Y EDUCATIVOS', 
      href: '/educacion', 
      icon: 'book',
      sublinks: TOPIC_LINKS['socio-cientificos']
    }
  ];

  // Manejar clic en dropdown toggle
  const handleDropdownToggle = (index) => {
    console.log('Dropdown toggle clicked:', index);
    console.log('Current openDropdown:', openDropdown);
    const newValue = openDropdown === index ? null : index;
    setOpenDropdown(newValue);
    console.log('New openDropdown:', newValue);
  };


  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown !== null) {
        const currentDropdown = dropdownRefs.current[openDropdown];
        if (currentDropdown && !currentDropdown.contains(event.target)) {
          setOpenDropdown(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  return (
    <div className="bg-white py-2 px-6 border-t border-b border-gray-200 w-full" style={{ position: 'relative', zIndex: 40 }}>
      <div className="w-[90%] md:w-[80%] max-w-7xl mx-auto flex items-center justify-center">
        <div className="flex flex-col md:flex-row items-center gap-4 w-[100%]">
          <div>
            <span className="text-gray-600 font-medium whitespace-nowrap">TEMAS RELACIONADOS:</span>
          </div>
          <div className="w-[100%] flex flex-col md:flex-row justify-center gap-4 md:gap-8">
            {topicLinks.map(({ text,  icon, sublinks }, index) => (
              <div 
                key={index}
                className="relative w-full md:w-auto"
                ref={el => dropdownRefs.current[index] = el}
              >
                {/* Enlace principal */}
                <div className="flex items-center justify-center md:justify-start w-full">
                  <div className="flex items-center group">
                    <div className="rounded-full p-2 bg-gray-100 group-hover:bg-gray-200 mr-2">
                      {React.createElement(getIconComponent(icon), { className: "w-5 h-5 text-[#606c38]" })}
                    </div>
                    <span className="text-gray-700 group-hover:text-[#606c38] font-medium text-sm text-center md:text-left">
                      {text}
                    </span>
                    
                    {/* Flecha indicadora de dropdown */}
                    {sublinks && (
                      <button 
                        className="ml-2 p-1 text-gray-500 hover:text-[#606c38] transition duration-150 ease-in-out"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDropdownToggle(index);
                        }}
                        aria-label={`Toggle ${text} submenu`}
                      >
                        <svg 
                          className={`w-4 h-4 transform transition-transform duration-200 ${
                            openDropdown === index ? 'rotate-180' : ''
                          }`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M19 9l-7 7-7-7" 
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Menú desplegable */}
                {sublinks && openDropdown === index && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-2xl z-50 opacity-100 visible translate-y-0 transition-all duration-200 ease-in-out"
                    style={{
                      width: '320px',
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                      zIndex: 60
                    }}
                  >
                    <div className="py-2 max-h-96 overflow-y-auto">
                      {sublinks.map(({ text: subText, href: subHref }, subIndex) => (
                        <a 
                          key={subIndex}
                          href={subHref}
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#606c38] transition duration-150 ease-in-out border-b border-gray-100 last:border-b-0"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {subText}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicsDropdown;
