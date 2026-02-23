
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/home",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/home"
  },
  {
    "renderMode": 2,
    "route": "/controle-acesso"
  },
  {
    "renderMode": 2,
    "route": "/controle-acesso/usuarios"
  },
  {
    "renderMode": 2,
    "route": "/controle-acesso/usuarios/novo"
  },
  {
    "renderMode": 0,
    "route": "/controle-acesso/usuarios/*/editar"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 35706, hash: '0f40bd1e7a034fc4633f3712c7721ac316ba719ffe20fff222afd5eaf924e449', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 27787, hash: 'a4536805d5e8ca9373ed092d6ab4dd5b50d7d3adab6147b6f907280a762a8590', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'home/index.html': {size: 52139, hash: '402b11030c2ab3043508c983950953c6c7047b6d29766ddc2a68e4d2243f161e', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'controle-acesso/index.html': {size: 51047, hash: '2d261548c435a4fe0f8ab940ee39c66f9c209e3b4a19d8919252070c028ee9b4', text: () => import('./assets-chunks/controle-acesso_index_html.mjs').then(m => m.default)},
    'controle-acesso/usuarios/index.html': {size: 76106, hash: '8ca789d884bce8a6bc04af5e5a04c650da36d093e730af52401251d6f1648ec7', text: () => import('./assets-chunks/controle-acesso_usuarios_index_html.mjs').then(m => m.default)},
    'controle-acesso/usuarios/novo/index.html': {size: 99646, hash: '11c747fcda195b4921c532a98ae9f1c8c37fe68485a996e948df53bdf25ed5d1', text: () => import('./assets-chunks/controle-acesso_usuarios_novo_index_html.mjs').then(m => m.default)},
    'styles-RBKSG7QR.css': {size: 19026, hash: 'Qj8buKT6wMs', text: () => import('./assets-chunks/styles-RBKSG7QR_css.mjs').then(m => m.default)}
  },
};
