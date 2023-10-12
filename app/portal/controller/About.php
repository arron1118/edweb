<?php
declare (strict_types = 1);

namespace app\portal\controller;

use app\admin\model\CooperateCustomers;
use app\common\controller\PortalController;
use think\facade\View;

class About extends PortalController
{
    protected string $title = '我们';

    public function index()
    {
        $cooperateCustomers = CooperateCustomers::field('id, title, logo, url')
            ->where([
                'status' => 1,
            ])->order('id asc, sort desc')->select();

        $html = $this->view->display(sysconfig('site', 'html_content'));
        $this->view->assign([
            'cooperate_customers' => $cooperateCustomers,
            'html' => $html,
        ]);

        return $this->view->fetch();
    }
}
