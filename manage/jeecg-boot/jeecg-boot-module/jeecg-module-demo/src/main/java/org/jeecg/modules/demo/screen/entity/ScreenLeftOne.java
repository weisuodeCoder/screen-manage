package org.jeecg.modules.demo.screen.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;
import org.jeecgframework.poi.excel.annotation.Excel;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

/**
 * @Description: 左1分组
 * @Author: jeecg-boot
 * @Date:   2025-06-08
 * @Version: V1.0
 */
@Data
@TableName("screen_left_one_main")
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = false)
@Schema(description="左1分组")
public class ScreenLeftOneMain implements Serializable {
    private static final long serialVersionUID = 1L;

	/**主键*/
	@TableId(type = IdType.ASSIGN_ID)
    @Schema(description = "主键")
    private String id;
	/**创建人*/
    @Schema(description = "创建人")
    private String createBy;
	/**创建日期*/
	@JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Schema(description = "创建日期")
    private Date createTime;
	/**更新人*/
    @Schema(description = "更新人")
    private String updateBy;
	/**更新日期*/
	@JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Schema(description = "更新日期")
    private Date updateTime;
	/**所属部门*/
    @Schema(description = "所属部门")
    private String sysOrgCode;
	/**名称*/
	@Excel(name = "名称", width = 15)
    @Schema(description = "名称")
    private String title;
	/**排序*/
	@Excel(name = "排序", width = 15)
    @Schema(description = "排序")
    private Integer sort;
	/**单位*/
	@Excel(name = "单位", width = 15)
    @Schema(description = "单位")
    private String unit;
}
