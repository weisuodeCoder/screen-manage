package org.jeecg.modules.demo.screen.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * @Description: 左1分组
 * @Author: jeecg-boot
 * @Date:   2025-06-08
 * @Version: V1.0
 */
@Mapper // 添加注解
public interface ScreenLeftOneMapper {
    List<Map<String, Object>> selectScreenLeftOne();
}