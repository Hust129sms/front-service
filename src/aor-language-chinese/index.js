module.exports = {
    aor: {
        action: {
            delete: '删除',
            show: '查看',
            list: '列表',
            save: '保存',
            create: '创建',
            edit: '编辑',
            cancel: '取消',
            refresh: '刷新',
            add_filter: '搜索',
            remove_filter: '清除搜索条件',
            back: '后退'
        },
        boolean: {
            true: '是',
            false: '否',
        },
        page: {
            list: '列表 %{name}',
            edit: '%{name} #%{id}',
            show: '%{name} #%{id}',
            create: '创建 %{name}',
            delete: '删除 %{name} #%{id}',
            dashboard: '总览',
            not_found: '找不到记录'
        },
        input: {
            image: {
                upload_several: '批量上传',
                upload_single: '上传',
            },
        },
        message: {
            yes: '是',
            no: '否',
            are_you_sure: '确定进行此操作？',
            about: '关于',
            not_found: '你所要查找的信息不存在',
        },
        navigation: {
            no_results: '无匹配结果',
            page_out_of_boundaries: 'La page %{page} est en dehors des limites',
            page_out_from_end: 'Fin de la pagination',
            page_out_from_begin: 'La page doit être supérieure à 1',
            page_range_info: '%{offsetBegin}-%{offsetEnd} 共 %{total}',
            next: '下一页',
            prev: '上一页',
        },
        auth: {
            username: 'email',
            password: '密码',
            sign_in: '登陆',
            sign_in_error: '登陆时出现错误',
            logout: '退出',
        },
        notification: {
            updated: '更新',
            created: '创建',
            deleted: '删除',
            item_doesnt_exist: '记录不存在',
            http_error: '网络连接错误',
        },
        validation: {
            required: '必填',
            minLength: '最小 %{min} 个字符',
            maxLength: '最长 %{max} 个字符',
            minValue: '最小值 %{min}',
            maxValue: '最大值 %{max}',
            number: '数值不合法',
            email: '请输入合法的email地址',
        },
    },
};
