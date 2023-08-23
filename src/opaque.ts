declare const opaqueMarker: unique symbol;

type opaque<T> = T & {
  get [opaqueMarker](): never;
};

export default opaque;
