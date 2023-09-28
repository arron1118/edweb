<?php
declare (strict_types = 1);

namespace app\portal\controller;

use app\admin\model\Carousel;
use app\admin\model\ShareCate;
use app\admin\model\Share as ShareModel;
use app\common\controller\PortalController;

class NewMedia extends PortalController
{
    protected string $title = '新媒体营销';

    protected $limit = 2;

    public function initialize(): void
    {
        parent::initialize();

        $this->model = ShareModel::class;

        $action = $this->app->request->action();
        $cate = $action === 'info' ? 6 : 4;

        $carousel = Carousel::field('id, img, url, content')->where([
            'status' => 1,
            'cate_id' => $cate,
        ])->order('sort asc, id desc')
            ->limit(1)
            ->select();

        $this->view->assign([
            'carousel' => count($carousel) > 0 ? $carousel[0] : [],
        ]);
    }

    public function getShareCateList()
    {
        $cates = ShareCate::field('id, title')
            ->where([
                'status' => 1,
            ])->order('id asc, sort desc')
            ->select();

        $this->success(lang('Get successful'), $cates);
    }

    public function getShareList()
    {
        $cate_id = $this->request->param('cate_id/d', 0);
        $page = $this->request->param('page/d', 1);
        $limit = $this->request->param('limit/d', $this->limit);
        if (!$cate_id) {
            $this->error(lang('The data does not exist'));
        }

        $total = $this->model::where([
            'share_cate_id' => $cate_id,
            'status' => 1
        ])->count();

        $cases = $this->model::field('id, share_cate_id, title, cover_img, description')
            ->where([
                'status' => 1,
                'share_cate_id' => $cate_id,
            ])->order('is_top desc, sort desc, id desc')
            ->limit(($page - 1) * $limit, $limit)
            ->select();

        return json([
            'msg' => lang('Get successful'),
            'data' => $cases,
            'total' => $total,
            'limit' => $limit,
        ]);
    }

    public function info($id)
    {
        $info = $this->model::find($id);
        $this->view->assign([
            'info' => $info,
            'title' => $info['title'],
            'keyword' => $info['keyword'],
            'description' => $info['description'],
        ]);

        return $this->view->fetch('public/info');
    }
}
