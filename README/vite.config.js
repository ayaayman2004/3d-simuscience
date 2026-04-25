import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/3d-simuscience/', // اكتبي هنا اسم المشروع بالظبط زي ما هو في جيت هاب
})