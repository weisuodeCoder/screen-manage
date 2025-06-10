package org.jeecg.modules.demo.screen.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.jeecg.modules.demo.screen.entity.ScreenLeftOne;
import org.jeecg.modules.demo.screen.entity.ScreenLeftTwo;
import org.jeecg.modules.demo.screen.entity.ScreenLeftTwoX;
import org.jeecg.modules.demo.screen.entity.ScreenLeftTwoY;
import org.jeecg.modules.demo.screen.mapper.ScreenLeftOneMapper;
import org.jeecg.modules.demo.screen.mapper.ScreenLeftTwoMapper;
import org.jeecg.modules.demo.screen.service.IScreenLeftOneService;
import org.jeecg.modules.demo.screen.service.IScreenLeftTwoService;
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
public class ScreenLeftTwoServiceImpl implements IScreenLeftTwoService {
    private final ScreenLeftTwoMapper screenLeftTwoMapper;

    @Override
    public ScreenLeftTwo getLeftTwoDatas(String type) {
        List<ScreenLeftTwoX> screenLeftTwoXES = screenLeftTwoMapper.selectScreenLeftOneX();
        List<ScreenLeftTwoY> screenLeftTwoYS = screenLeftTwoMapper.selectScreenLeftOneY(type);
        ScreenLeftTwo screenLeftTwo = new ScreenLeftTwo();
        screenLeftTwo.setScreenLeftTwoXs(screenLeftTwoXES);
        screenLeftTwo.setScreenLeftTwoYs(screenLeftTwoYS);
        return screenLeftTwo;
    }
}
