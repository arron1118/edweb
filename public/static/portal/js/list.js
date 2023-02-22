(function ($, window, undefined) {

    let listContainer = $('.list-container')

    this.List = function (options) {
        this.CONFIG = {
            CATE_URL: '/Cases/getCasesCateList',
            LIST_URL: '/Cases/getCasesList',
            INFO_URL: '/cases/info.html',
        }

        if (options) {
            this.CONFIG = $.extend(this.CONFIG, options)
        }
    }

    List.prototype.init = function () {
        let _self = this
        $.get(_self.CONFIG.CATE_URL, {}, function (cates) {
            cates = cates.data
            if (cates.length > 0) {
                // tablist
                let nav = $('<ul />', {
                    class: 'nav nav-pills mb-3 justify-content-center',
                    id: 'pills-tab',
                    role: 'tablist',
                })
                let content = $('<div />', {
                    class: 'tab-content',
                    id: 'pills-tabContent',
                })

                $.each(cates, function (index, item) {
                    nav.append($('<li />', {
                        class: 'nav-item mb-5',
                        role: 'presentation',
                        'data-id': item.id,
                    }).append($('<button />', {
                        class: 'nav-link ' + (index === 0 ? 'active' : ''),
                        id: 'pills-' + item.id + '-tab',
                        'data-bs-toggle': 'pill',
                        'data-bs-target': '#pills-' + item.id,
                        type: 'button',
                        role: 'tab',
                    }).text(item.title).on('click', function () {
                        _self.getCasesList(item.id)
                    })))

                    content.append($('<div />', {
                        class: 'tab-pane fade show ' + (index === 0 ? 'active' : ''),
                        id: 'pills-' + item.id,
                        role: 'tabpanel',
                        'aria-labelledby': 'pills-' + item.id + '-tab',
                        tabindex: index,
                    }).append($('<div />', {
                        class: 'container tab-pane',
                    }).append($('<div />', {
                        class: 'row list-content',
                    }))))
                })

                $(listContainer).append(nav).append(content)

                // tabContent
                _self.getCasesList(cates[0].id)
            }
        })
    }

    List.prototype.getCasesList = function (cate_id, page = 1, limit = 6) {
        let _self = this
        $.get(_self.CONFIG.LIST_URL, {cate_id: cate_id, page: page, limit: limit}, function (cases) {
            if (cases.data.length > 0) {
                $('#pills-' + cate_id + ' .list-content').children().remove()
                // content
                $.each(cases.data, function (index, item) {
                    let listContent = $('#pills-' + cate_id + ' .list-content')
                    listContent.append($('<div />', {
                        class: 'col-lg-4 col-md-6 col-sm-6 mb-4',
                    }).append($('<div />', {
                        class: 'card p-0 border-0 bg-transparent',
                    }).hover(function () {
                        $(this).addClass('shadow')
                    }, function () {
                        $(this).removeClass('shadow')
                    }).append($('<div/>',{
                            class:'d-flex justify-content-center align-items-center',
                            style:'height: 300px;'
                        }).append(
                            $('<img />', {
                            src: item.cover_img ? item.cover_img : '/static/common/images/nopic.jpg',
                            alt: item.title,
                            class: 'card-img-top img-fluid',
                            style: 'max-height: 300px;width: auto;',
                        })
                        )

                    ).append($('<div />', {
                        class: 'card-body'
                    }).append($('<div />', {
                        class: 'card-title line1',
                    }).append($('<a />', {
                        class: 'stretched-link text-reset',
                        href: _self.CONFIG.INFO_URL + '?id=' + item.id,
                        title: item.title,
                        target: '_blank',
                    }).text(item.title))).append($('<div />', {
                        class: 'card-content line3',
                    }).text(item.description)))))
                })

                // pages
                let p = Math.ceil(cases.total / cases.limit)
                if (p > 1) {
                    $('#pills-' + cate_id + ' .list-page').remove()
                    let ul = $('<ul />', {
                        class: 'pagination justify-content-center',
                    })

                    let prevPage = $('<li />', {
                        class: 'page-item disabled',
                    }).append($('<a />', {
                        class: 'page-link',
                    }).text('上一页'))
                    if (page > 1) {
                        prevPage = $('<li />', {
                            class: 'page-item',
                        }).append($('<a />', {
                            class: 'page-link',
                            href: 'javascript:()',
                        }).text('上一页').on('click', function () {
                            _self.getCasesList(cate_id, page - 1)
                        }))
                    }
                    ul.append(prevPage)

                    for (let i = 1; i <= p; i++) {
                        ul.append($('<li />', {
                            class: 'page-item ' + (i === page ? 'active' : ''),
                        }).append($('<a />', {
                            class: 'page-link',
                            href: 'javascript:()',
                        }).text(i).on('click', function () {
                            _self.getCasesList(cate_id, i)
                        })))
                    }

                    let nextPage = $('<li />', {
                        class: 'page-item disabled',
                    }).append($('<a />', {
                        class: 'page-link',
                    }).text('下一页'))
                    if (page < p) {
                        nextPage = $('<li />', {
                            class: 'page-item',
                        }).append($('<a />', {
                            class: 'page-link',
                            href: 'javascript:()',
                        }).text('下一页').on('click', function () {
                            _self.getCasesList(cate_id, page + 1)
                        }))
                    }
                    ul.append(nextPage)

                    $('#pills-' + cate_id).append($('<div />', {
                        class: 'row list-page',
                    }).append($('<nav />', {
                        'aria-label': 'Page navigation',
                    }).append(ul)))
                }
            }
        })
    }

})(jQuery, window)
