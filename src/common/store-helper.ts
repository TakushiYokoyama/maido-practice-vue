import { IStore } from '../store';
import {
  mapState as s,
  mapGetters as g,
  mapMutations as m,
  mapActions as a,
} from 'vuex';

export const mapState = <TState>(
  namespace: keyof IStore,
  ...keys: Array<keyof TState>
): any => {
  return s(namespace, keys.map((x) => x.toString()));
};
export const mapGetters = <TGetters>(
  namespace: keyof IStore,
  ...keys: Array<keyof TGetters>
): any => {
  return g(namespace, keys.map((x) => x.toString()));
};
export const mapMutations = <TMutations>(
  namespace: keyof IStore,
  ...keys: Array<keyof TMutations>
): any => {
  return m(namespace, keys.map((x) => x.toString()));
};
export const mapActions = <TActions>(
  namespace: keyof IStore,
  ...keys: Array<keyof TActions>
): any => {
  return a(namespace, keys.map((x) => x.toString()));
};
