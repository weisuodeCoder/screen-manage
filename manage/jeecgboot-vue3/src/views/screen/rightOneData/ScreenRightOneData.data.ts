import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '分组id',
    align: 'center',
    dataIndex: 'groupId_dictText',
  },
  {
    title: '名称',
    align: 'center',
    dataIndex: 'name',
  },
  {
    title: '数值',
    align: 'center',
    dataIndex: 'value',
  },
  {
    title: '单位',
    align: 'center',
    dataIndex: 'unit',
  },

  {
    title: '颜色',
    align: 'center',
    dataIndex: 'colorOne',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '分组id',
    field: 'groupId',
    component: 'JSelectMultiple',
    componentProps: {
      dictCode: 'screen_right_one_main,title,id',
    },
    //colProps: {span: 6},
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '分组id',
    field: 'groupId',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'screen_right_one_main,title,id',
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
    label: '数值',
    field: 'value',
    component: 'InputNumber',
    dynamicRules: () => {
      return [{ required: true, message: '请输入数值!' }];
    },
  },
  {
    label: '单位',
    field: 'unit',
    component: 'Input',
  },
  {
    label: '颜色',
    field: 'colorOne',
    component: 'JColorPicker',
    dynamicRules: () => {
      return [{ required: true, message: '请输入颜色!' }];
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
  groupId: { title: '分组id', order: 0, view: 'list', type: 'string', dictTable: 'screen_right_one_main', dictCode: 'id', dictText: 'title' },
  value: { title: '数值', order: 1, view: 'number', type: 'number' },
  unit: { title: '单位', order: 2, view: 'text', type: 'string' },
  name: { title: '名称', order: 3, view: 'text', type: 'string' },
  colorOne: { title: '颜色', order: 4, view: 'text', type: 'string' },
};

/**
 * 流程表单调用这个方法获取formSchema
 * @param param
 */
export function getBpmFormSchema(_formData): FormSchema[] {
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
