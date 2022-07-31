import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';
import { Loading } from '@alifd/next';
import { buildComponents, assetBundle, AssetLevel, AssetLoader } from '@alilc/lowcode-utils';
import ReactRenderer from '@alilc/lowcode-react-renderer';
import { injectComponents } from '@alilc/lowcode-plugin-inject';
import { createFetchHandler } from '@alilc/lowcode-datasource-fetch-handler'

import { getProjectSchemaFromLocalStorage, getPackagesFromLocalStorage } from './universal/utils';
import { getUrlParams } from './utils/qs';

// const getScenarioName = function() {
//   if (location.search) {
//    return new URLSearchParams(location.search.slice(1)).get('scenarioName') || 'index'
//   }
//   return 'index';
// }

const page = getUrlParams('page');
let packages: [] = [];
let projectSchema = {
  // componentsMap: [],
  // componentsTree: []
}

const SamplePreview = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const getPackage = async () => {
      const result = await (await fetch('https://tracys.oss-cn-chengdu.aliyuncs.com/assets.json')).json();
      packages = result?.packages;
    }
    const getProjectSchema = async () => {
      const result = await (await fetch(`https://tracys.oss-cn-chengdu.aliyuncs.com/schema/${page}.json`)).json();
      projectSchema = JSON.parse(result);
    }
    const init_page = async () => {
      await getPackage();
      await getProjectSchema();
      init();
    }
    init_page();
  }, []);

  async function init() {
    // const scenarioName = getScenarioName();
    // const packages = getPackagesFromLocalStorage();
    // const projectSchema = getProjectSchemaFromLocalStorage();
    console.log(packages, projectSchema);
    const { componentsMap: componentsMapArray, componentsTree } = projectSchema;
    const componentsMap: any = {};
    componentsMapArray.forEach((component: any) => {
      componentsMap[component.componentName] = component;
    });
    const schema = componentsTree[0];

    const libraryMap = {};
    const libraryAsset = [];
    packages.forEach(({ package: _package, library, urls, renderUrls }) => {
      libraryMap[_package] = library;
      if (renderUrls) {
        libraryAsset.push(renderUrls);
      } else if (urls) {
        libraryAsset.push(urls);
      }
    });

    const vendors = [assetBundle(libraryAsset, AssetLevel.Library)];

    // TODO asset may cause pollution
    const assetLoader = new AssetLoader();
    await assetLoader.load(libraryAsset);
    const components = await injectComponents(buildComponents(libraryMap, componentsMap));

    setData({
      schema,
      components,
    });
  }

  const { schema, components } = data;

  if (!schema || !components) {
    init();
    return <Loading fullScreen />;
  }

  return (
    <div className="lowcode-plugin-sample-preview">
      <ReactRenderer
        className="lowcode-plugin-sample-preview-content"
        schema={schema}
        components={components}
        appHelper={{
          requestHandlersMap: {
            fetch: createFetchHandler()
          }
        }}
      />
    </div>
  );
};

ReactDOM.render(<SamplePreview />, document.getElementById('ice-container'));
