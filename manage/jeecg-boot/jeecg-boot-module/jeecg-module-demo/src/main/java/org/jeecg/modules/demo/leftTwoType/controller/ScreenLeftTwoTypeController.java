package org.jeecg.modules.demo.leftTwoType.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jeecg.common.api.vo.Result;
import org.jeecg.common.system.query.QueryGenerator;
import org.jeecg.common.system.query.QueryRuleEnum;
import org.jeecg.common.util.oConvertUtils;
import org.jeecg.modules.demo.leftTwoType.entity.ScreenLeftTwoType;
import org.jeecg.modules.demo.leftTwoType.service.IScreenLeftTwoTypeService;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.extern.slf4j.Slf4j;

import org.jeecgframework.poi.excel.ExcelImportUtil;
import org.jeecgframework.poi.excel.def.NormalExcelConstants;
import org.jeecgframework.poi.excel.entity.ExportParams;
import org.jeecgframework.poi.excel.entity.ImportParams;
import org.jeecgframework.poi.excel.view.JeecgEntityExcelView;
import org.jeecg.common.system.base.controller.JeecgController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;
import com.alibaba.fastjson.JSON;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import org.jeecg.common.aspect.annotation.AutoLog;
import org.apache.shiro.authz.annotation.RequiresPermissions;

 /**
 * @Description: 左2类型配置
 * @Author: jeecg-boot
 * @Date:   2025-06-14
 * @Version: V1.0
 */
@Tag(name="左2类型配置")
@RestController
@RequestMapping("/leftTwoType/screenLeftTwoType")
@Slf4j
public class ScreenLeftTwoTypeController extends JeecgController<ScreenLeftTwoType, IScreenLeftTwoTypeService> {
	@Autowired
	private IScreenLeftTwoTypeService screenLeftTwoTypeService;
	
	/**
	 * 分页列表查询
	 *
	 * @param screenLeftTwoType
	 * @param pageNo
	 * @param pageSize
	 * @param req
	 * @return
	 */
	//@AutoLog(value = "左2类型配置-分页列表查询")
	@Operation(summary="左2类型配置-分页列表查询")
	@GetMapping(value = "/list")
	public Result<IPage<ScreenLeftTwoType>> queryPageList(ScreenLeftTwoType screenLeftTwoType,
								   @RequestParam(name="pageNo", defaultValue="1") Integer pageNo,
								   @RequestParam(name="pageSize", defaultValue="10") Integer pageSize,
								   HttpServletRequest req) {
        QueryWrapper<ScreenLeftTwoType> queryWrapper = QueryGenerator.initQueryWrapper(screenLeftTwoType, req.getParameterMap());
		Page<ScreenLeftTwoType> page = new Page<ScreenLeftTwoType>(pageNo, pageSize);
		IPage<ScreenLeftTwoType> pageList = screenLeftTwoTypeService.page(page, queryWrapper);
		return Result.OK(pageList);
	}
	
	/**
	 *   添加
	 *
	 * @param screenLeftTwoType
	 * @return
	 */
	@AutoLog(value = "左2类型配置-添加")
	@Operation(summary="左2类型配置-添加")
	@PostMapping(value = "/add")
	public Result<String> add(@RequestBody ScreenLeftTwoType screenLeftTwoType) {
		screenLeftTwoTypeService.save(screenLeftTwoType);
		return Result.OK("添加成功！");
	}
	
	/**
	 *  编辑
	 *
	 * @param screenLeftTwoType
	 * @return
	 */
	@AutoLog(value = "左2类型配置-编辑")
	@Operation(summary="左2类型配置-编辑")
	@RequestMapping(value = "/edit", method = {RequestMethod.PUT,RequestMethod.POST})
	public Result<String> edit(@RequestBody ScreenLeftTwoType screenLeftTwoType) {
		screenLeftTwoTypeService.updateById(screenLeftTwoType);
		return Result.OK("编辑成功!");
	}
	
	/**
	 *   通过id删除
	 *
	 * @param id
	 * @return
	 */
	@AutoLog(value = "左2类型配置-通过id删除")
	@Operation(summary="左2类型配置-通过id删除")
	@DeleteMapping(value = "/delete")
	public Result<String> delete(@RequestParam(name="id",required=true) String id) {
		screenLeftTwoTypeService.removeById(id);
		return Result.OK("删除成功!");
	}
	
	/**
	 *  批量删除
	 *
	 * @param ids
	 * @return
	 */
	@AutoLog(value = "左2类型配置-批量删除")
	@Operation(summary="左2类型配置-批量删除")
	@DeleteMapping(value = "/deleteBatch")
	public Result<String> deleteBatch(@RequestParam(name="ids",required=true) String ids) {
		this.screenLeftTwoTypeService.removeByIds(Arrays.asList(ids.split(",")));
		return Result.OK("批量删除成功!");
	}
	
	/**
	 * 通过id查询
	 *
	 * @param id
	 * @return
	 */
	//@AutoLog(value = "左2类型配置-通过id查询")
	@Operation(summary="左2类型配置-通过id查询")
	@GetMapping(value = "/queryById")
	public Result<ScreenLeftTwoType> queryById(@RequestParam(name="id",required=true) String id) {
		ScreenLeftTwoType screenLeftTwoType = screenLeftTwoTypeService.getById(id);
		if(screenLeftTwoType==null) {
			return Result.error("未找到对应数据");
		}
		return Result.OK(screenLeftTwoType);
	}

    /**
    * 导出excel
    *
    * @param request
    * @param screenLeftTwoType
    */
    @RequestMapping(value = "/exportXls")
    public ModelAndView exportXls(HttpServletRequest request, ScreenLeftTwoType screenLeftTwoType) {
        return super.exportXls(request, screenLeftTwoType, ScreenLeftTwoType.class, "左2类型配置");
    }

    /**
      * 通过excel导入数据
    *
    * @param request
    * @param response
    * @return
    */
    @RequestMapping(value = "/importExcel", method = RequestMethod.POST)
    public Result<?> importExcel(HttpServletRequest request, HttpServletResponse response) {
        return super.importExcel(request, response, ScreenLeftTwoType.class);
    }

}
