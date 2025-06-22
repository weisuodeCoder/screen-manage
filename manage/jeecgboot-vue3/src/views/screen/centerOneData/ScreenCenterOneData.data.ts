import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '地区',
    align: 'center',
    dataIndex: 'groupId_dictText',
  },
  {
    title: '名称',
    align: 'center',
    dataIndex: 'name',
  },
  {
    title: '数量',
    align: 'center',
    dataIndex: 'value',
  },
  {
    title: '单位',
    align: 'center',
    dataIndex: 'unit',
  },
  {
    title: '备注',
    align: 'center',
    dataIndex: 'remark',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '地区',
    field: 'groupId',
    component: 'JSelectMultiple',
    componentProps: {
      dictCode: 'screen_center_region_code',
    },
    //colProps: {span: 6},
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '地区',
    field: 'groupId',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'screen_center_region_code',
    },
    dynamicRules: () => {
      return [{ required: true, message: '请输入地区!' }];
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
    label: '数量',
    field: 'value',
    component: 'InputNumber',
    dynamicRules: () => {
      return [{ required: true, message: '请输入数量!' }];
    },
  },
  {
    label: '单位',
    field: 'unit',
    component: 'Input',
  },
  {
    label: '备注',
    field: 'remark',
    component: 'Input',
    dynamicRules: () => {
      return [{ max: 30, message: '最多输入30个字符' }];
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
  groupId: { title: '地区', order: 0, view: 'list', type: 'string', dictCode: 'screen_center_region_code' },
  name: { title: '名称', order: 1, view: 'text', type: 'string' },
  value: { title: '数量', order: 2, view: 'number', type: 'number' },
  unit: { title: '单位', order: 3, view: 'text', type: 'string' },
  remark: { title: '备注', order: 4, view: 'text', type: 'string' },
};

/**
 * 流程表单调用这个方法获取formSchema
 * @param param
 */
export function getBpmFormSchema(_formData): FormSchema[] {
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
