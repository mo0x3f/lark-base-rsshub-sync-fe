import './App.css';
import { useState, useEffect } from 'react';
import { bitable } from '@lark-base-open/connector-api';
import { Button, Form, Input } from 'antd';

export default function App() {
    const [form] = Form.useForm();
    const [value, setValue] = useState({});

    console.log('loading');
    useEffect(() => {
        bitable.getConfig().then(config => {
            console.log('pre sync config ', config)
            setValue(config?.value | {});
            const rssUrl = config?.['rss-url'] || '';
            console.log('rss url: ', rssUrl)
            form.setFieldsValue({ 'rss-url': rssUrl }); // 手动更新表单值
        });
    }, [])

    const handleSaveConfig = (config) => {
        // TODO: handle submit check: 1. url validator
        console.log('config', config);
        bitable.saveConfigAndGoNext(config);
    }

        ; return (
            <div>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={handleSaveConfig}
                    autoComplete="off"
                >
                    <Form.Item
                        label="RSS 订阅链接"
                        name="rss-url"
                        rules={[{ required: true, message: '请输入字段' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label=""
                    >
                        <Button type="primary" htmlType="submit">下一步</Button>
                    </Form.Item>
                </Form>
            </div>
        )
}