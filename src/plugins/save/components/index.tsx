import React from "react";
import { Button } from '@alifd/next';
import { project } from "@alilc/lowcode-engine";
import { savePageSchema } from "src/api/schema";
import { getUrlParams } from "src/utils/qs";

const page = getUrlParams('page');

const Save: React.FC = (props) => {
    const save = async() => {
       const schema = project.exportSchema();
        await savePageSchema({
            page: page || 'index',
            schema: JSON.stringify(schema),
        })
    }
    return <Button type="primary" onClick={save}>保存</Button>
}
export default Save;