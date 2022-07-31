import {ILowCodePluginContext} from '@alilc/lowcode-engine';
import Pages from './components/index';

export const PluginPage = (ctx: ILowCodePluginContext) => {
    return {
      name: 'PluginPage',
      async init() {
        const { skeleton } = ctx;
  
        skeleton.add({
          name: 'PluginPage',
          area: 'leftArea',
          type: 'PanelDock',
          props: {
            align: "left",
            icon: "wenjian",
            description: "页面管理",
          },
          index: -1,
          panelProps: {
            floatable: true, // 是否可浮动
            maxWidth: 1200,
            title: "页面管理",
            width: 600,
          },
          content: <Pages />,
        });
      },
    };
  };
  PluginPage.pluginName = 'PluginPage';