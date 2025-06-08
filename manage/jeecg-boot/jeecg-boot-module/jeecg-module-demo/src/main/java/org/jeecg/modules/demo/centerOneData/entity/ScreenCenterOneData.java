package org.jeecg.modules.demo.centerOneData.entity;

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
 * @Description: 中一数据
 * @Author: jeecg-boot
 * @Date:   2025-06-09
 * @Version: V1.0
 */
@Data
@TableName("screen_center_one_data")
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = false)
@Schema(description="中一数据")
public class ScreenCenterOneData implements Serializable {
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
	/**地区*/
	@Excel(name = "地区", width = 15, dictTable = "screen_center_one_main", dicText = "title", dicCode = "id")
	@Dict(dictTable = "screen_center_one_main", dicText = "title", dicCode = "id")
    @Schema(description = "地区")
    private java.lang.String groupId;
	/**名称*/
	@Excel(name = "名称", width = 15)
    @Schema(description = "名称")
    private java.lang.String name;
	/**数据*/
	@Excel(name = "数据", width = 15)
    @Schema(description = "数据")
    private java.lang.Integer value;
	/**单位*/
	@Excel(name = "单位", width = 15)
    @Schema(description = "单位")
    private java.lang.String unit;
	/**日期*/
	@Excel(name = "日期", width = 15, format = "yyyy-MM-dd")
	@JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    @Schema(description = "日期")
    private java.util.Date time;
}
