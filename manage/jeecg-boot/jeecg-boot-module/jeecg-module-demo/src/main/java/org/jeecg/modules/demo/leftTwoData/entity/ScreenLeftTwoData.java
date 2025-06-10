package org.jeecg.modules.demo.leftTwoData.entity;

import java.io.Serializable;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.math.BigDecimal;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.TableLogic;
import org.jeecg.common.constant.ProvinceCityArea;
import org.jeecg.common.util.SpringContextUtils;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;
import org.jeecgframework.poi.excel.annotation.Excel;
import org.jeecg.common.aspect.annotation.Dict;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * @Description: 左二数据
 * @Author: jeecg-boot
 * @Date:   2025-06-10
 * @Version: V1.0
 */
@Data
@TableName("screen_left_two_data")
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = false)
@Schema(description="左二数据")
public class ScreenLeftTwoData implements Serializable {
    private static final long serialVersionUID = 1L;

	/**主键*/
	@TableId(type = IdType.ASSIGN_ID)
    @Schema(description = "主键")
    private java.lang.String id;
	/**创建人*/
    @Schema(description = "创建人")
    private java.lang.String createBy;
	/**创建日期*/
	@JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Schema(description = "创建日期")
    private java.util.Date createTime;
	/**更新人*/
    @Schema(description = "更新人")
    private java.lang.String updateBy;
	/**更新日期*/
	@JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Schema(description = "更新日期")
    private java.util.Date updateTime;
	/**所属部门*/
    @Schema(description = "所属部门")
    private java.lang.String sysOrgCode;
	/**分组id*/
	@Excel(name = "分组id", width = 15, dictTable = "screen_left_two_main", dicText = "title", dicCode = "id")
	@Dict(dictTable = "screen_left_two_main", dicText = "title", dicCode = "id")
    @Schema(description = "分组id")
    private java.lang.String groupId;
	/**搜索余*/
	@Excel(name = "搜索余", width = 15, dicCode = "screen_left_two_type")
	@Dict(dicCode = "screen_left_two_type")
    @Schema(description = "搜索余")
    private java.lang.String type;
	/**类型*/
	@Excel(name = "类型", width = 15, dicCode = "screen_left_two_class_name")
	@Dict(dicCode = "screen_left_two_class_name")
    @Schema(description = "类型")
    private java.lang.String className;
	/**数值*/
	@Excel(name = "数值", width = 15)
    @Schema(description = "数值")
    private java.lang.Integer value;
	/**单位*/
	@Excel(name = "单位", width = 15)
    @Schema(description = "单位")
    private java.lang.String unit;
}
