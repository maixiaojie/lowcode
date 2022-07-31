import React from "react";
import { Button, Message } from '@alifd/next';
import { project } from "@alilc/lowcode-engine";
import { savePageSchema } from "src/api/schema";
import { getUrlParams } from "src/utils/qs";

const page = getUrlParams('page');

const Save: React.FC = (props) => {
    const save = async () => {
        const schema = project.exportSchema();
        try {
            const res: any = await savePageSchema({
                page: page || 'index',
                schema: JSON.stringify(schema),
            });
            if (res && !res.code) {
                Message.success(res.message);
            }
        } catch (e) {
            Message.success('上传失败');
        }

    }
    return <Button type="primary" onClick={save}>保存</Button>
}
export default Save;