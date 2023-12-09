import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';
import { Redirection, RedirectSettings } from '../types';

const DEFAULT_CONFIG: RedirectSettings = {
  redirections: [],
};

type RedirectSettingsStorage = BaseStorage<RedirectSettings> & {
  saveRedirections(r: Redirection[]);
  getAllRedirections(): Promise<Redirection[]>;
};

const storage = createStorage<RedirectSettings>('page-redirect-config-storage-key', DEFAULT_CONFIG, {
  storageType: StorageType.Local,
});

const redirectSettingsStorage: RedirectSettingsStorage = {
  ...storage,
  getAllRedirections() {
    return storage.get().then(({ redirections }) => redirections);
  },
  saveRedirections(redirections) {
    storage.set(current => ({ ...current, redirections }));
  },
};

export default redirectSettingsStorage;
