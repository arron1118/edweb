<?php

namespace app\admin\model;

use app\common\model\TimeModel;

class Carousel extends TimeModel
{

    protected $name = "carousel";

    protected $deleteTime = "delete_time";


    public function getCateIdList()
    {
        return [
            1 => '首页',
            2 => '短视频营销',
            3 => '新媒体营销',
            4 => '行业解决方案',
            5 => '案例鉴赏',
            6 => 'Tiktok运营',
            7 => '网站建设',
            8 => '关于我们',
            9 => '详情页',
        ];
    }

    public function getStatusList()
    {
        return ['0' => '禁用', '1' => '启用',];
    }


}
