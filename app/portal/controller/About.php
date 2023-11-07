<?php
declare (strict_types = 1);

namespace app\portal\controller;

use app\admin\model\Carousel;
use app\admin\model\CooperateCustomers;
use app\common\controller\PortalController;
use think\facade\View;

class About extends PortalController
{
    protected string $title = '我们';

    public function index()
    {

        $carousel = Carousel::field('id, img, url, content')->where([
            'status' => 1,
            'cate_id' => 8,
        ])->order('sort asc, id desc')
            ->limit(1)
            ->select();

        $cooperateCustomers = CooperateCustomers::field('id, title, logo, url')
            ->where([
                'status' => 1,
            ])->order('id asc, sort desc')->select();

        $html = $this->view->display(sysconfig('site', 'html_content'));
        $this->view->assign([
            'cooperate_customers' => $cooperateCustomers,
            'html' => $html,
            'carousel' => count($carousel) > 0 ? $carousel[0] : [],
        ]);

        return $this->view->fetch();
    }
}
