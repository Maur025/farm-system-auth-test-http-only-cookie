import { AbstractSingleCache, BaseData } from '@maur025/cache-util-ng';

interface Device extends BaseData {
  name: string;
}

export class DeviceCache extends AbstractSingleCache<Device> {
  private readonly deviceMap = new Map<string, Device>();

  protected override getResource(): string {
    return 'devices';
  }

  protected override getMap(): Map<string, Device> {
    return this.deviceMap;
  }
}

const deviceCache = new DeviceCache();

deviceCache.addById('device1', { id: 'device1', name: 'Device 1' });
