import {ILowCodePluginContext} from '@alilc/lowcode-engine';
import Save from './components/index';

export const PluginSave = (ctx: ILowCodePluginContext) => {
    return {
      name: 'PluginSave',
      async init() {
        const { skeleton } = ctx;
  
        skeleton.add({
          name: 'PluginSave',
          area: 'topArea',
          type: 'Widget',
          props: {
            align: 'right',
          },
          content: <Save />,
        });
      },
    };
  };
  PluginSave.pluginName = 'PluginSave';