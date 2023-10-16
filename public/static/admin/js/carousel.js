define(["jquery", "easy-admin"], function ($, ea) {

    var init = {
        table_elem: '#currentTable',
        table_render_id: 'currentTableRenderId',
        index_url: 'carousel/index',
        add_url: 'carousel/add',
        edit_url: 'carousel/edit',
        delete_url: 'carousel/delete',
        export_url: 'carousel/export',
        modify_url: 'carousel/modify',
    };

    var Controller = {

        index: function () {
            ea.table.render({
                init: init,
                cols: [[
                    {type: 'checkbox'},
                    {field: 'id', title: 'ID'},
                    {
                        field: 'cate_id', search: 'select', selectList: {
                            1: '首页',
                            2: '短视频营销',
                            3: '新媒体营销',
                            4: '行业解决方案',
                            5: '案例鉴赏',
                            6: 'Tiktok运营',
                            7: '网站建设',
                            8: '关于我们'
                        }, title: '栏目ID'
                    },
                    {field: 'img', title: '图片', templet: ea.table.image},
                    {field: 'url', title: '链接'},
                    {field: 'sort', title: '排序', edit: 'text'},
                    {
                        field: 'status',
                        search: 'select',
                        selectList: ["禁用", "启用"],
                        title: '状态',
                        templet: ea.table.switch
                    },
                    {field: 'create_time', title: '创建时间'},
                    {width: 250, title: '操作', templet: ea.table.tool},
                ]],
            });

            ea.listen();
        },
        add: function () {
            ea.listen();
        },
        edit: function () {
            ea.listen();
        },
    };
    return Controller;
});
