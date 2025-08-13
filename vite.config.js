import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss({
      content: [
        './src/**/*.{js,jsx,ts,tsx}', // Scan all JS/JSX/TS/TSX files in src/
      ],
      theme: {
        extend: {
          // Custom fonts
          fontFamily: {
            general: ['general', 'sans-serif'],
            'circular-web': ['circular-web', 'sans-serif'],
            'robert-medium': ['robert-medium', 'sans-serif'],
            'robert-regular': ['robert-regular', 'sans-serif'],
            zentry: ['zentry', 'sans-serif'],
            'general-sans': ['General Sans', 'sans-serif'],
          },
          // Custom animations
          animation: {
            'indicator': 'indicator-line 0.5s ease infinite',
            'three-body': 'spin78236 2s infinite linear',
            'wobble1': 'wobble1 0.8s infinite ease-in-out',
            'wobble2': 'wobble2 0.8s infinite ease-in-out',
          },
          keyframes: {
            'indicator-line': {
              '0%': { height: '4px', transform: 'translateY(0px)' },
              '50%': { height: '16px', transform: 'translateY(-4px)' },
              '100%': { height: '4px', transform: 'translateY(0px)' },
            },
            spin78236: {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' },
            },
            wobble1: {
              '0%, 100%': { transform: 'translateY(0%) scale(1)', opacity: '1' },
              '50%': { transform: 'translateY(-66%) scale(0.65)', opacity: '0.8' },
            },
            wobble2: {
              '0%, 100%': { transform: 'translateY(0%) scale(1)', opacity: '1' },
              '50%': { transform: 'translateY(66%) scale(0.65)', opacity: '0.8' },
            },
          },
          // Custom utilities
          spacing: {
            '0.5': '0.125rem', // For -bottom-0.5
          },
        },
      },
      plugins: [
        // Custom plugin to add utility classes
        function ({ addUtilities }) {
          addUtilities({
            '.nav-hover-btn': {
              position: 'relative',
              marginLeft: '2.5rem', // ms-10
              fontFamily: 'general, sans-serif',
              fontSize: '0.75rem', // text-xs
              textTransform: 'uppercase',
              color: '#e0f2fe', // text-blue-50
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: '-0.125rem', // -bottom-0.5
                left: '0',
                height: '2px',
                width: '100%',
                transformOrigin: 'bottom right',
                transform: 'scaleX(0)',
                backgroundColor: '#1f2937', // bg-neutral-800
                transitionProperty: 'transform',
                transitionDuration: '300ms',
                transitionTimingFunction: 'cubic-bezier(0.65, 0.05, 0.36, 1)',
              },
              '&:hover:after': {
                transformOrigin: 'bottom left',
                transform: 'scaleX(1)',
              },
              '.dark &:after': {
                backgroundColor: '#ffffff', // dark:bg-white
              },
              cursor: 'pointer',
            },
            '.floating-nav': {
              backgroundColor: '#000000', // bg-black
              borderRadius: '0.5rem', // rounded-lg
              border: '1px solid', // border
            },
            '.absolute-center': {
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            },
            '.flex-center': {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
            '.mask-clip-path': {
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            },
            '.special-font b': {
              fontFamily: 'zentry, sans-serif',
              fontFeatureSettings: '"ss01" on',
            },
            '.hero-heading': {
              textTransform: 'uppercase',
              fontFamily: 'zentry, sans-serif',
              fontWeight: '900', // font-black
              fontSize: '2.25rem', // text-5xl
              '@screen sm': {
                right: '2.5rem', // right-10
                fontSize: '4.5rem', // text-7xl
              },
              '@screen md': {
                fontSize: '6rem', // text-9xl
              },
              '@screen lg': {
                fontSize: '12rem', // text-[12rem]
              },
            },
            '.about-subtext': {
              position: 'absolute',
              bottom: '-80dvh',
              left: '50%',
              width: '100%',
              maxWidth: '24rem', // max-w-96
              transform: 'translateX(-50%)',
              textAlign: 'center',
              fontFamily: 'circular-web, sans-serif',
              fontSize: '1.125rem', // text-lg
              '@screen md': {
                maxWidth: '34rem', // max-w-[34rem]
              },
            },
            '.about-image': {
              position: 'absolute',
              left: '50%',
              top: '0',
              zIndex: '20',
              height: '60vh',
              width: '24rem', // w-96
              transformOrigin: 'center',
              transform: 'translateX(-50%)',
              overflow: 'hidden',
              borderRadius: '1.5rem', // rounded-3xl
              '@screen md': {
                width: '30vw',
              },
            },
            '.animated-title': {
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem', // gap-1
              fontSize: '4.5rem', // text-7xl
              textTransform: 'uppercase',
              lineHeight: '0.8',
              color: '#ffffff', // text-white
              '@screen sm': {
                paddingLeft: '8rem', // px-32
                paddingRight: '8rem',
              },
              '@screen md': {
                fontSize: '6rem', // text-[6rem]
              },
            },
            '.animated-word': {
              fontFamily: 'zentry, sans-serif',
              fontWeight: '900', // font-black
              opacity: '0',
              transform: 'translate3d(10px, 51px, -60px) rotateY(60deg) rotateX(-40deg)',
              transformOrigin: '50% 50% -150px !important',
              willChange: 'opacity, transform',
            },
            '.bento-tilt_1': {
              position: 'relative',
              border: '1px solid rgba(255, 255, 255, 0.2)', // border-hsla
              gridColumn: 'span 2', // col-span-2
              overflow: 'hidden',
              borderRadius: '0.375rem', // rounded-md
              transitionProperty: 'transform',
              transitionDuration: '300ms',
              transitionTimingFunction: 'ease-out',
            },
            '.bento-tilt_2': {
              position: 'relative',
              gridColumn: 'span 1', // col-span-1
              gridRow: 'span 1', // row-span-1
              overflow: 'hidden',
              borderRadius: '0.375rem', // rounded-md
              transitionProperty: 'transform',
              transitionDuration: '300ms',
              transitionTimingFunction: 'ease-out',
            },
            '.bento-title': {
              textTransform: 'uppercase',
              fontSize: '2.25rem', // text-4xl
              fontWeight: '900', // font-black
              fontFamily: 'zentry, sans-serif',
              '@screen md': {
                fontSize: '3.75rem', // text-6xl
              },
            },
            '.story-img-container': {
              position: 'relative',
              width: '100%',
              height: '90vh',
              '@screen md': {
                height: '100dvh',
              },
              filter: 'url("#flt_tag")',
            },
            '.story-img-mask': {
              position: 'absolute',
              left: '0',
              top: '0',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              '@screen md': {
                left: '20%',
                top: '-10%',
                width: '80%',
                height: '80%',
              },
              clipPath: 'polygon(4% 0, 83% 21%, 100% 73%, 0 100%)',
            },
            '.story-img-content': {
              position: 'absolute',
              width: '100%',
              height: '50dvh',
              opacity: '1',
              left: '2.5rem', // left-10
              top: '4rem', // top-16
              '@screen md': {
                height: '100dvh',
                left: '0',
                top: '2.5rem', // top-10
              },
              '@screen lg': {
                left: '-300px',
                top: '-100px',
              },
              transform: 'translate3d(0, 0, 0) rotateX(0) rotateY(0) rotateZ(0) scale(1)',
            },
            '.gallery-img-container': {
              width: '16rem', // size-64
              height: '16rem',
              overflow: 'hidden',
              backgroundColor: '#c4b5fd', // bg-violet-300
            },
            '.gallery-img': {
              width: '100%',
              height: '100%',
              backgroundSize: 'cover',
            },
            '.gallery-img-4': {
              '@screen sm': {
                width: '20rem', // size-80
                height: '20rem',
              },
              '@screen md': {
                height: '24rem', // h-96
                width: '25rem', // w-[25rem]
              },
              borderRadius: '0.5rem', // rounded-lg
            },
            '.sword-man-clip-path': {
              clipPath: 'polygon(16% 0, 89% 15%, 75% 100%, 0 97%)',
            },
            '.contact-clip-path-1': {
              clipPath: 'polygon(25% 0%, 74% 0, 69% 64%, 34% 73%)',
            },
            '.contact-clip-path-2': {
              clipPath: 'polygon(29% 15%, 85% 30%, 50% 100%, 10% 64%)',
            },
          });
        },
      ],
    }),
    react(),
  ],
});