import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '名称',
    align: 'center',
    dataIndex: 'title',
  },
  {
    title: '排序',
    align: 'center',
    dataIndex: 'sort',
  },
  {
    title: '颜色1',
    align: 'center',
    dataIndex: 'colorOne',
  },
  {
    title: '颜色2',
    align: 'center',
    dataIndex: 'colorTwo',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '名称',
    field: 'title',
    component: 'Input',
    //colProps: {span: 6},
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '名称',
    field: 'title',
    component: 'Input',
    dynamicRules: () => {
      return [{ required: true, message: '请输入名称!' }];
    },
  },
  {
    label: '排序',
    field: 'sort',
    component: 'InputNumber',
    dynamicRules: () => {
      return [{ required: true, message: '请输入排序!' }];
    },
  },
  {
    label: '颜色1',
    field: 'colorOne',
    component: 'JColorPicker',
    dynamicRules: () => {
      return [{ required: true, message: '请输入颜色!' }];
    },
  },
  {
    label: '颜色2',
    field: 'colorTwo',
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
  createBy: { title: '创建人', order: 0, view: 'text', type: 'string' },
  createTime: { title: '创建日期', order: 1, view: 'datetime', type: 'string' },
  updateBy: { title: '更新人', order: 2, view: 'text', type: 'string' },
  updateTime: { title: '更新日期', order: 3, view: 'datetime', type: 'string' },
  title: { title: '名称', order: 4, view: 'text', type: 'string' },
  sort: { title: '排序', order: 5, view: 'number', type: 'number' },
  colorOne: { title: '颜色1', order: 6, view: 'text', type: 'string' },
  colorTwo: { title: '颜色2', order: 7, view: 'text', type: 'string' },
};

/**
 * 流程表单调用这个方法获取formSchema
 * @param param
 */
export function getBpmFormSchema(_formData): FormSchema[] {
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
