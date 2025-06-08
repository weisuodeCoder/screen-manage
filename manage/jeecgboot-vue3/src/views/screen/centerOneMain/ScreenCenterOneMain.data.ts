import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '地区编码',
    align:"center",
    dataIndex: 'adcode'
   },
   {
    title: '地区名称',
    align:"center",
    dataIndex: 'title'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: "地区编码",
    field: "adcode",
    component: 'JInput',
  },
  {
    label: "地区名称",
    field: "title",
    component: 'JInput',
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '地区编码',
    field: 'adcode',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入地区编码!'},
          ];
     },
  },
  {
    label: '地区名称',
    field: 'title',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入地区名称!'},
          ];
     },
  },
	// TODO 主键隐藏字段，目前写死为ID
	{
	  label: '',
	  field: 'id',
	  component: 'Input',
	  show: false
	},
];

// 高级查询数据
export const superQuerySchema = {
  adcode: {title: '地区编码',order: 0,view: 'text', type: 'string',},
  title: {title: '地区名称',order: 1,view: 'text', type: 'string',},
};

/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[]{
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}