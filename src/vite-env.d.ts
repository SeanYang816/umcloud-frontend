import React from 'react'
import 'vite/client'
declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGElement>>
  export default content
}

/// <reference types="vite/client" />
