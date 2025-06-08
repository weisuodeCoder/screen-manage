package org.jeecg.modules.demo.screen.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.jeecg.modules.demo.screen.entity.ScreenLeftOne;
import org.jeecg.modules.demo.screen.entity.ScreenRightOne;
import org.jeecg.modules.demo.screen.mapper.ScreenLeftOneMapper;
import org.jeecg.modules.demo.screen.mapper.ScreenRightOneMapper;
import org.jeecg.modules.demo.screen.service.IScreenLeftOneService;
import org.jeecg.modules.demo.screen.service.IScreenRightOneService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @Description: 左1分组
 * @Author: jeecg-boot
 * @Date:   2025-06-08
 * @Version: V1.0
 */
@Service
@RequiredArgsConstructor
public class ScreenRightOneServiceImpl implements IScreenRightOneService {
    private final ScreenRightOneMapper screenRightOneMapper;

    @Override
    public List<ScreenRightOne> getRightOneDatas() {
        return screenRightOneMapper.selectScreenRightOne();
    }
}
