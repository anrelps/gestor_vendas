// Larguras do sidebar em rem (valores CSS, não classes Tailwind)
export const SIDEBAR_WIDTH_EXPANDED = '24rem';
export const SIDEBAR_WIDTH_COLLAPSED = '5rem';

// Breakpoint para desktop (deve concordar com Tailwind)
export const BREAKPOINT_MD = 768;
// Z-index hierarchy (camadas visuais)
// Hierarquia clara de sobreposição para desktop e mobile
export const Z_INDEX = {
  SIDEBAR_DESKTOP: 30, // Sidebar desktop (fundo)
  OVERLAY_MOBILE: 40, // Overlay mobile (atrás do drawer)
  DRAWER_MOBILE: 50, // Drawer/menu mobile
  HEADER_MOBILE: 60, // Header mobile (topo absoluto)
};
