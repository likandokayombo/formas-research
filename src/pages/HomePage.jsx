import React, { useEffect, useRef } from 'react';
import { FaLeaf, FaHandsHelping, FaUsers, FaHandshake } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const containerRef = useRef(null);
  const leafRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const specialThanksRef = useRef(null);
  const badgesRef = useRef([]);
  const contentRefs = useRef([]);
  const iconRefs = useRef([]);

  useEffect(() => {
    // Set initial styles
    gsap.set([leafRef.current, headingRef.current, subheadingRef.current], {
      opacity: 0,
      y: 20
    });
    
    // Master timeline for sequential animations
    const tl = gsap.timeline();
    
    // Animate leaf icon
    tl.to(leafRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    });
    
    // Animate main heading
    tl.to(headingRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5");
    
    // Animate subheading
    tl.to(subheadingRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.3");
    
    // Animate special thanks heading
    tl.to(specialThanksRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.7,
      ease: "elastic.out(1, 0.8)"
    }, "-=0.2");
    
    // Animate badges with stagger effect
    tl.to(badgesRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: 0.15,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.2");
    
    // Animate content sections on scroll
    contentRefs.current.forEach((section, i) => {
      gsap.fromTo(section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            toggleActions: "play none none none",
            markers: false
          }
        }
      );
    });
    
    // Animate icons with continuous subtle effects
    iconRefs.current.forEach(icon => {
      gsap.to(icon, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto pt-10 pb-16 px-4 min-h-screen bg-gradient-to-b from-white to-emerald-50 dark:from-gray-900 dark:to-emerald-900/20">
      <div className="text-center mb-12 pt-8">
        <div ref={leafRef} className="opacity-0 transform translate-y-5">
          <FaLeaf className="text-7xl mx-auto mb-6 text-emerald-600 dark:text-emerald-400" />
        </div>
        
        <h1
          ref={headingRef}
          className="PPNeueMontreal-Book text-4xl md:text-5xl font-bold mb-6 text-emerald-800 dark:text-emerald-100 opacity-0 transform translate-y-5"
        >
          Communal Green Spaces For Wellbeing
        </h1>
        
        <h3
          ref={subheadingRef}
          className="PPNeueMontreal-Book text-xl md:text-2xl font-medium mb-8 text-gray-800 dark:text-emerald-100 opacity-0 transform translate-y-5 max-w-3xl mx-auto px-4"
        >
          Using participatory action research for inclusive green space design for slum dwellers in Zambia
        </h3>
        
        <h3
          ref={specialThanksRef}
          className="text-2xl md:text-3xl font-bold mt-16 mb-8 text-emerald-700 dark:text-emerald-300 opacity-0 scale-90"
        >
          Special Thanks To
        </h3>
        
        <div className="flex flex-wrap justify-center gap-6 mt-4 mb-16">
          {[
            { name: "Community Partners", icon: FaHandsHelping },
            { name: "Research Team", icon: FaUsers },
            { name: "Local Authorities", icon: FaHandshake },
            { name: "Funding Organizations", icon: FaLeaf }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                ref={el => {
                  badgesRef.current[index] = el;
                  iconRefs.current[index] = el?.querySelector('svg');
                }}
                className="px-6 py-5 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-emerald-200 dark:border-emerald-700 opacity-0 transform translate-y-10 scale-95"
              >
                <Icon className="text-3xl mx-auto mb-3 text-emerald-600 dark:text-emerald-400" />
                <span className="text-lg font-semibold text-emerald-800 dark:text-emerald-200">{item.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content sections */}
      <div className="mt-8 space-y-14">
        {[
          {
            title: "Project Overview",
            content: "Developing accessible green spaces in urban slum areas through community-driven design approaches that prioritize resident needs and environmental sustainability."
          },
          {
            title: "Research Methodology",
            content: "Participatory action research engaging local residents in all phases of design and implementation, ensuring solutions are culturally appropriate and community-owned."
          },
          {
            title: "Community Impact",
            content: "Creating sustainable oases that improve mental health, foster social cohesion, enhance environmental quality, and provide economic opportunities for vulnerable populations."
          }
        ].map((section, index) => (
          <div
            key={index}
            ref={el => contentRefs.current[index] = el}
            className="p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-emerald-200 dark:border-emerald-700"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-5 text-emerald-700 dark:text-emerald-300">
              {section.title}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {section.content}
            </p>
          </div>
        ))}
      </div>
      
      {/* Footer */}
      <div className="mt-20 pt-8 border-t border-emerald-200 dark:border-emerald-700 text-center">
        <p className="text-gray-600 dark:text-emerald-300">
          © {new Date().getFullYear()} Formas Research
        </p>
        <p className="text-gray-500 dark:text-emerald-400 text-sm mt-2">
          Creating sustainable communities through participatory design
        </p>
      </div>
    </div>
  );
};

export default HomePage;













// import React, { useEffect, useRef } from 'react';
// import { FaLeaf, FaHandsHelping, FaUsers, FaHandshake } from 'react-icons/fa';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// // Register ScrollTrigger plugin
// gsap.registerPlugin(ScrollTrigger);

// const HomePage = () => {
//   const containerRef = useRef(null);
//   const leafRef = useRef(null);
//   const headingRef = useRef(null);
//   const subheadingRef = useRef(null);
//   const specialThanksRef = useRef(null);
//   const badgesRef = useRef([]);
//   const contentRefs = useRef([]);
//   const iconRefs = useRef([]);

//   useEffect(() => {
//     // Animation code remains the same...
//   }, []);

//   return (
//     <div ref={containerRef} className="max-w-4xl mx-auto pt-10 pb-16 px-4 min-h-screen bg-gradient-to-b from-white to-emerald-50 dark:from-gray-900 dark:to-emerald-900/20">
//       <div className="text-center mb-12 pt-8">
//         <div ref={leafRef} className="opacity-0 transform translate-y-5">
//           <FaLeaf className="text-7xl mx-auto mb-6 text-emerald-600 dark:text-emerald-400" />
//         </div>
        
//         {/* Apply PPNeueMontreal-Book for heading */}
//         <h1 
//           ref={headingRef}
//           className="font-heading text-4xl md:text-5xl font-bold mb-6 text-emerald-800 dark:text-emerald-100 opacity-0 transform translate-y-5"
//         >
//           Communal Green Spaces For Wellbeing
//         </h1>
        
//         {/* Apply PPNeueMontreal-Book for subheading */}
//         <h3 
//           ref={subheadingRef}
//           className="font-heading text-xl md:text-2xl font-medium mb-8 text-gray-800 dark:text-emerald-100 opacity-0 transform translate-y-5 max-w-3xl mx-auto px-4"
//         >
//           Using participatory action research for inclusive green space design for slum dwellers in Zambia
//         </h3>
        
//         {/* Apply PPNeueMontreal-Bold for special thanks */}
//         <h3 
//           ref={specialThanksRef}
//           className="font-another text-2xl md:text-3xl font-bold mt-16 mb-8 text-emerald-700 dark:text-emerald-300 opacity-0 scale-90"
//         >
//           Special Thanks To
//         </h3>
        
//         <div className="flex flex-wrap justify-center gap-6 mt-4 mb-16">
//           {[
//             { name: "Community Partners", icon: FaHandsHelping },
//             { name: "Research Team", icon: FaUsers },
//             { name: "Local Authorities", icon: FaHandshake },
//             { name: "Funding Organizations", icon: FaLeaf }
//           ].map((item, index) => {
//             const Icon = item.icon;
//             return (
//               <div 
//                 key={index} 
//                 ref={el => {
//                   badgesRef.current[index] = el;
//                   iconRefs.current[index] = el?.querySelector('svg');
//                 }}
//                 className="px-6 py-5 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-emerald-200 dark:border-emerald-700 opacity-0 transform translate-y-10 scale-95"
//               >
//                 <Icon className="text-3xl mx-auto mb-3 text-emerald-600 dark:text-emerald-400" />
//                 {/* Apply PPNeueMontreal-Bold for badge text */}
//                 <span className="font-another text-lg font-semibold text-emerald-800 dark:text-emerald-200">{item.name}</span>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Content sections */}
//       <div className="mt-8 space-y-14">
//         {[
//           {
//             title: "Project Overview",
//             content: "Developing accessible green spaces in urban slum areas through community-driven design approaches that prioritize resident needs and environmental sustainability."
//           },
//           {
//             title: "Research Methodology",
//             content: "Participatory action research engaging local residents in all phases of design and implementation, ensuring solutions are culturally appropriate and community-owned."
//           },
//           {
//             title: "Community Impact",
//             content: "Creating sustainable oases that improve mental health, foster social cohesion, enhance environmental quality, and provide economic opportunities for vulnerable populations."
//           }
//         ].map((section, index) => (
//           <div 
//             key={index} 
//             ref={el => contentRefs.current[index] = el}
//             className="p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-emerald-200 dark:border-emerald-700"
//           >
//             {/* Apply PPNeueMontreal-Bold for section titles */}
//             <h2 className="font-another text-2xl md:text-3xl font-bold mb-5 text-emerald-700 dark:text-emerald-300">
//               {section.title}
//             </h2>
//             {/* Apply CoveredByYourGrace for body content */}
//             <p className="font-grace text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
//               {section.content}
//             </p>
//           </div>
//         ))}
//       </div>
      
//       {/* Footer - Apply CoveredByYourGrace */}
//       <div className="font-grace mt-20 pt-8 border-t border-emerald-200 dark:border-emerald-700 text-center">
//         <p className="text-gray-600 dark:text-emerald-300">
//           © {new Date().getFullYear()} Formas Research
//         </p>
//         <p className="text-gray-500 dark:text-emerald-400 text-sm mt-2">
//           Creating sustainable communities through participatory design
//         </p>
//       </div>
//     </div>
//   );
// };

// export default HomePage;