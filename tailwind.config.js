/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        /* Map your CSS variables to Tailwind color names */
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        border: '#d1d5db',      // fallback to Tailwind gray-300 approximating your border color
        ring: '#3b82f6',        // fallback to blue-500 for outline/ring

        /* Optional: map other CSS variables if you want to use them as classes */
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        popover: 'var(--popover)',
        'popover-foreground': 'var(--popover-foreground)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        secondary: 'var(--secondary)',
        'secondary-foreground': 'var(--secondary-foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
        destructive: 'var(--destructive)',
        input: 'var(--input)',
        sidebar: 'var(--sidebar)',
        'sidebar-foreground': 'var(--sidebar-foreground)',
        /* Add any other variables you want to expose */
      }
    }
  },
  plugins: [],
}
