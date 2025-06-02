package org.jeecg.modules.demo.leftOneMain.controller;

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
import org.jeecg.modules.demo.leftOneMain.entity.ScreenLeftOneMain;
import org.jeecg.modules.demo.leftOneMain.service.IScreenLeftOneMainService;

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

 /**
 * @Description: 左1分组
 * @Author: jeecg-boot
 * @Date:   2025-06-02
 * @Version: V1.0
 */
@Tag(name="左1分组")
@RestController
@RequestMapping("/leftOneMain/screenLeftOneMain")
@Slf4j
public class ScreenLeftOneMainController extends JeecgController<ScreenLeftOneMain, IScreenLeftOneMainService> {
	@Autowired
	private IScreenLeftOneMainService screenLeftOneMainService;
	
	/**
	 * 分页列表查询
	 *
	 * @param screenLeftOneMain
	 * @param pageNo
	 * @param pageSize
	 * @param req
	 * @return
	 */
	//@AutoLog(value = "左1分组-分页列表查询")
	@Operation(summary="左1分组-分页列表查询")
	@GetMapping(value = "/list")
	public Result<IPage<ScreenLeftOneMain>> queryPageList(ScreenLeftOneMain screenLeftOneMain,
								   @RequestParam(name="pageNo", defaultValue="1") Integer pageNo,
								   @RequestParam(name="pageSize", defaultValue="10") Integer pageSize,
								   HttpServletRequest req) {
        QueryWrapper<ScreenLeftOneMain> queryWrapper = QueryGenerator.initQueryWrapper(screenLeftOneMain, req.getParameterMap());
		Page<ScreenLeftOneMain> page = new Page<ScreenLeftOneMain>(pageNo, pageSize);
		IPage<ScreenLeftOneMain> pageList = screenLeftOneMainService.page(page, queryWrapper);
		return Result.OK(pageList);
	}
	
	/**
	 *   添加
	 *
	 * @param screenLeftOneMain
	 * @return
	 */
	@AutoLog(value = "左1分组-添加")
	@Operation(summary="左1分组-添加")
	@PostMapping(value = "/add")
	public Result<String> add(@RequestBody ScreenLeftOneMain screenLeftOneMain) {
		screenLeftOneMainService.save(screenLeftOneMain);
		return Result.OK("添加成功！");
	}
	
	/**
	 *  编辑
	 *
	 * @param screenLeftOneMain
	 * @return
	 */
	@AutoLog(value = "左1分组-编辑")
	@Operation(summary="左1分组-编辑")
	@RequestMapping(value = "/edit", method = {RequestMethod.PUT,RequestMethod.POST})
	public Result<String> edit(@RequestBody ScreenLeftOneMain screenLeftOneMain) {
		screenLeftOneMainService.updateById(screenLeftOneMain);
		return Result.OK("编辑成功!");
	}
	
	/**
	 *   通过id删除
	 *
	 * @param id
	 * @return
	 */
	@AutoLog(value = "左1分组-通过id删除")
	@Operation(summary="左1分组-通过id删除")
	@DeleteMapping(value = "/delete")
	public Result<String> delete(@RequestParam(name="id",required=true) String id) {
		screenLeftOneMainService.removeById(id);
		return Result.OK("删除成功!");
	}
	
	/**
	 *  批量删除
	 *
	 * @param ids
	 * @return
	 */
	@AutoLog(value = "左1分组-批量删除")
	@Operation(summary="左1分组-批量删除")
	@DeleteMapping(value = "/deleteBatch")
	public Result<String> deleteBatch(@RequestParam(name="ids",required=true) String ids) {
		this.screenLeftOneMainService.removeByIds(Arrays.asList(ids.split(",")));
		return Result.OK("批量删除成功!");
	}
	
	/**
	 * 通过id查询
	 *
	 * @param id
	 * @return
	 */
	//@AutoLog(value = "左1分组-通过id查询")
	@Operation(summary="左1分组-通过id查询")
	@GetMapping(value = "/queryById")
	public Result<ScreenLeftOneMain> queryById(@RequestParam(name="id",required=true) String id) {
		ScreenLeftOneMain screenLeftOneMain = screenLeftOneMainService.getById(id);
		if(screenLeftOneMain==null) {
			return Result.error("未找到对应数据");
		}
		return Result.OK(screenLeftOneMain);
	}

    /**
    * 导出excel
    *
    * @param request
    * @param screenLeftOneMain
    */
    @RequestMapping(value = "/exportXls")
    public ModelAndView exportXls(HttpServletRequest request, ScreenLeftOneMain screenLeftOneMain) {
        return super.exportXls(request, screenLeftOneMain, ScreenLeftOneMain.class, "左1分组");
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
        return super.importExcel(request, response, ScreenLeftOneMain.class);
    }

}
