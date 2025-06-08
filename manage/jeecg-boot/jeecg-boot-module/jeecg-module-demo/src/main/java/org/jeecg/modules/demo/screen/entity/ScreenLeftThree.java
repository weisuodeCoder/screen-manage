package org.jeecg.modules.demo.screen.entity;


import lombok.Data;

import java.util.List;

@Data
public class ScreenLeftThree {
    private List<ScreenLeftThreeX> screenLeftThreeXES;
    private List<ScreenLeftThreeY> screenLeftThreeYS;
}