const isServer = typeof window === 'undefined';

export default {
  isServer,
  isClient: !isServer,
  isHydrationRender: true,
};
