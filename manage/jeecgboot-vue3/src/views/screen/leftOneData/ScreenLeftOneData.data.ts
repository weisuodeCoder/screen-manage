import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '分组id',
    align: 'center',
    dataIndex: 'groupId_dictText',
  },
  {
    title: '数据值',
    align: 'center',
    dataIndex: 'value',
  },
  {
    title: '名称',
    align: 'center',
    dataIndex: 'name',
  },
  {
    title: '外围颜色',
    align: 'center',
    dataIndex: 'colorOne',
  },
  {
    title: '内部颜色',
    align: 'center',
    dataIndex: 'colorTwo',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '分组id',
    field: 'groupId',
    component: 'JSelectMultiple',
    componentProps: {
      dictCode: 'screen_left_one_main,title,id',
    },
    //colProps: {span: 6},
  },
  {
    label: '名称',
    field: 'name',
    component: 'JInput',
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '分组id',
    field: 'groupId',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'screen_left_one_main,title,id',
    },
    dynamicRules: () => {
      return [{ required: true, message: '请输入分组id!' }];
    },
  },
  {
    label: '名称',
    field: 'name',
    component: 'Input',
    dynamicRules: () => {
      return [{ required: true, message: '请输入名称!' }];
    },
  },
  {
    label: '数据值',
    field: 'value',
    component: 'InputNumber',
    dynamicRules: () => {
      return [{ required: true, message: '请输入数据值!' }];
    },
  },
  {
    label: '外围颜色',
    field: 'colorOne',
    component: 'JColorPicker',
    componentProps: {
      showAlpha: false,
    },
    dynamicRules: () => {
      return [{ required: true, message: '请输入外围颜色!' }];
    },
  },
  {
    label: '内部颜色',
    field: 'colorTwo',
    component: 'JColorPicker',
    dynamicRules: () => {
      return [{ required: true, message: '请输入内部颜色!' }];
    },
  },
  // TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];

// 高级查询数据
export const superQuerySchema = {
  groupId: { title: '分组id', order: 0, view: 'list', type: 'string', dictTable: 'screen_left_one_main', dictCode: 'id', dictText: 'title' },
  value: { title: '数据值', order: 1, view: 'number', type: 'number' },
  unit: { title: '单位', order: 2, view: 'text', type: 'string' },
  name: { title: '名称', order: 3, view: 'text', type: 'string' },
  colorOne: { title: '外围颜色', order: 4, view: 'list', type: 'string', dictCode: '' },
  colorTwo: { title: '内部颜色', order: 5, view: 'text', type: 'string' },
};

/**
 * 流程表单调用这个方法获取formSchema
 * @param param
 */
export function getBpmFormSchema(_formData): FormSchema[] {
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
