package org.jeecg.modules.demo.screen.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.jeecg.modules.demo.screen.entity.ScreenCenterOne;

import java.util.List;
import java.util.Map;

/**
 * @Description: 左1分组
 * @Author: jeecg-boot
 * @Date:   2025-06-08
 * @Version: V1.0
 */
@Mapper // 添加注解
public interface ScreenCenterOneMapper {
    List<ScreenCenterOne> selectScreenCenterOne();
}