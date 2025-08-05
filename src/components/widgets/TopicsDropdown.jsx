import React, { useState, useRef, useEffect } from 'react';

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

  // Definición de temas relacionados con sublinks
  const topicLinks = [
    { 
      text: 'POLÍTICA', 
      href: '/politica', 
      icon: 'currency-dollar',
      sublinks: [
        { text: 'Política Nacional', href: '/politica/nacional' },
        { text: 'Política Internacional', href: '/politica/internacional' },
        { text: 'Análisis Político', href: '/politica/analisis' }
      ]
    },
    { 
      text: 'ECONOMÍA', 
      href: '/economia', 
      icon: 'currency-dollar',
      sublinks: [
        { text: 'Macroeconomía', href: '/economia/macro' },
        { text: 'Microeconomía', href: '/economia/micro' },
        { text: 'Finanzas', href: '/economia/finanzas' }
      ]
    },
    { 
      text: 'EDUCACIÓN', 
      href: '/educacion', 
      icon: 'book',
      sublinks: [
        { text: 'Pedagogía', href: '/educacion/pedagogia' },
        { text: 'Tecnología Educativa', href: '/educacion/tecnologia' },
        { text: 'Investigación', href: '/educacion/investigacion' }
      ]
    },
    { 
      text: 'BIENESTAR', 
      href: '/bienestar', 
      icon: 'book',
      sublinks: [
        { text: 'Salud Mental', href: '/bienestar/salud-mental' },
        { text: 'Ejercicio', href: '/bienestar/ejercicio' },
        { text: 'Nutrición', href: '/bienestar/nutricion' }
      ]
    },
    { 
      text: 'CIENCIA Y TECNOLOGÍA', 
      href: '/ciencia-tecnologia', 
      icon: 'bulb',
      sublinks: [
        { text: 'Inteligencia Artificial', href: '/ciencia-tecnologia/ia' },
        { text: 'Biotecnología', href: '/ciencia-tecnologia/biotech' },
        { text: 'Innovación', href: '/ciencia-tecnologia/innovacion' }
      ]
    }
  ];

  // Manejar clic en dropdown toggle
  const handleDropdownToggle = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
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
    <div className="bg-white py-2 px-6 border-t border-b border-gray-200">
      <div className="w-[90%] md:w-[80%] max-w-7xl mx-auto flex items-center justify-center">
        <div className="flex flex-col md:flex-row items-center gap-4 w-[100%]">
          <div>
            <span className="text-gray-600 font-medium whitespace-nowrap">TEMAS RELACIONADOS:</span>
          </div>
          <div className="w-[100%] flex flex-col md:flex-row justify-center">
            {topicLinks.map(({ text, href, icon, sublinks }, index) => (
              <div 
                key={index}
                className="relative flex items-center justify-center w-[100%]"
                ref={el => dropdownRefs.current[index] = el}
              >
                {/* Enlace principal */}
                <div className="flex items-center justify-start w-[90%]">
                  <a 
                    href={href}
                    className="flex items-center group transition duration-150 ease-in-out"
                  >
                    <div className="rounded-full p-2 bg-gray-100 group-hover:bg-gray-200 mr-2">
                      {React.createElement(getIconComponent(icon), { className: "w-5 h-5 text-[#606c38]" })}
                    </div>
                    <span className="text-gray-700 group-hover:text-[#606c38] font-medium text-sm">
                      {text}
                    </span>
                  </a>
                  
                  {/* Flecha indicadora de dropdown */}
                  {sublinks && (
                    <button 
                      className="ml-1 p-1 text-gray-500 hover:text-[#606c38] transition duration-150 ease-in-out"
                      onClick={() => handleDropdownToggle(index)}
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
                
                {/* Menú desplegable */}
                {sublinks && (
                  <div 
                    className={`absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-2xl z-[99999] transition-all duration-200 ease-in-out ${
                      openDropdown === index 
                        ? 'opacity-100 visible transform translate-y-0' 
                        : 'opacity-0 invisible transform -translate-y-2'
                    }`}
                  >
                    <div className="py-2">
                      {sublinks.map(({ text: subText, href: subHref }, subIndex) => (
                        <a 
                          key={subIndex}
                          href={subHref}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#606c38] transition duration-150 ease-in-out"
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
