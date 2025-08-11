/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './@/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background, #f5f7fa)',           
        foreground: 'var(--foreground, #222)',
        card: 'var(--card, #fff)',
        'card-foreground': 'var(--card-foreground, #252641)',
        popover: 'var(--popover, #fafaff)',                
        'popover-foreground': 'var(--popover-foreground, #23272f)',
        sidebar: 'var(--sidebar, #23272f)',                
        'sidebar-foreground': 'var(--sidebar-foreground, #eee)',
        border: 'var(--border, #e5e7eb)',                  
        ring: 'var(--ring, #2563eb)',                      
        primary: 'var(--primary, #406af6)',                
        'primary-foreground': 'var(--primary-foreground, #fff)',
        secondary: 'var(--secondary, #64748b)',            
        'secondary-foreground': 'var(--secondary-foreground, #fff)',
        accent: 'var(--accent, #ffa53b)',                  
        'accent-foreground': 'var(--accent-foreground, #23272f)',
        destructive: 'var(--destructive, #ec4b60)',        
        muted: 'var(--muted, #f3f4f6)',                    
        'muted-foreground': 'var(--muted-foreground, #6b7280)', 
        input: 'var(--input, #000)',                    
        highlight: 'var(--highlight, #c7d2fe)',            
      },
    },
  },
  plugins: [],
}