<?php
declare (strict_types = 1);

namespace app\portal\controller;

use app\admin\model\Carousel;
use app\common\controller\PortalController;

class Website extends PortalController
{
    protected string $title = '网站建设';

    public function initialize(): void
    {
        parent::initialize(); // TODO: Change the autogenerated stub

        $carousel = Carousel::field('id, img, url, content')->where([
            'status' => 1,
            'cate_id' => 7,
        ])->order('sort asc, id desc')
            ->limit(1)
            ->select();

        $this->view->assign([
            'carousel' => count($carousel) > 0 ? $carousel[0] : [],
        ]);
    }
}
