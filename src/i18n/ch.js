export default {
    pos: {
        search: '筛选',
        configuration: '设置',
        language: '语言选择',
        theme: {
            name: '主题颜色',
            light: '羽蓝',
            dark: '酷黑',
        },
        dashboard: {
            monthly_revenue: '余额',
            new_orders: '新订单',
            pending_reviews: '回复',
            new_customers: '成员清单',
            pending_orders: '进行中订单',
            top_up: '充值',
            history: '订单记录',
            order: {
                items: 'by %{customer_name}, one item |||| by %{customer_name}, %{nb_items} items',
            },
            welcome: {
                title: '欢迎使用飞羽管理系统',
                subtitle: '在这里你可以发送你的消息，管理你的圈子',
            },
        },
    },
    resources: {
        customers: {
            name: '用户 |||| 用户',
            fields: {
                commands: '订单',
                groups: '组别',
                last_seen_gte: '上次登录',
                name: '姓名',
            },
            tabs: {
                identity: '身份',
                address: '地址',
                orders: '订单',
                reviews: '评论',
                stats: '状态',
            },
            page: {
                delete: '删除用户',
            },
        },
        commands: {
            name: '订单 |||| 订单',
            fields: {
                basket: {
                    delivery: '派送',
                    reference: '依据',
                    quantity: '数量',
                    sum: '总计',
                    tax_rate: '税率',
                    total: '总共',
                    unit_price: '单价',
                },
                customer_id: '用户',
                date_gte: '通过日期',
                date_lte: 'Passed Before',
                total_gte: '最小数量',
            },
        },
        groups: {
            name: '圈子 |||| 圈子',
            my_group: '我的圈子',
            fields: {
                group_type: '圈子类型',
                group_name: '圈子名称',
                group_description: '描述一下你的圈子',
                group_shortname: '简称(可选)',
                telephone_validate: '请输入正确的手机号！',
                manager_name: '管理者姓名',
                telephone: '手机号',
                email: '邮箱',
                email_validate: '请输入正确的邮箱地址！',
                telephone_visiable: '电话是否公开',
                tele_public: '公开',
                id: '编号',
                name: '名称',
                type: '类型',
                members: '成员数',
                balance: '圈子余额',
            },
            tabs: {
                details: '圈子信息',
                manager: '管理者信息',
            },
            group_type: {
                association: '社团/协会',
                student_union: '学生会',
                team: '小型团队/小组',
                classes: '班级',
                college: '学院',
                match: '活动/赛事参与者',
            },
        },
        charge_group_history: {
            name: '圈存记录 |||| 圈存记录',
            charge_record: '圈存记录',
            fields: {
                id: '订单编号',
                in_group: '圈存圈子',
                amount: '金额',
                time: '订单时间',
            },
        },
        members: {
            name: '通讯录',
        },
        send: {
            name: '发送',
        },
        collect: {
            name: '统计',
        },
        products: {
            name: '海报 |||| 海报',
            fields: {
                category_id: '目录',
                height_gte: '最小高度',
                height_lte: '最大高度',
                height: '高度',
                image: '图片',
                price: '价格',
                reference: '依据',
                stock_lte: '库存不足',
                stock: '库存充足',
                thumbnail: '缩略图',
                width_gte: '最小宽度',
                width_lte: '最大宽度',
                width: '宽度',
            },
            tabs: {
                image: '图片',
                details: '详情',
                description: '描述',
                reviews: '评论',
            },
        },
        categories: {
            name: '类别 |||| 类别',
            fields: {
                products: '产品',
            },

        },
        reviews: {
            name: '评论 |||| 评论',
            fields: {
                customer_id: '用户',
                command_id: '订单',
                product_id: '产品',
                date_gte: '开始日期',
                date_lte: '截止日期',
                date: '日期',
                comment: '注释',
                rating: '评级',
            },
            action: {
                accept: '接受',
                reject: '拒绝',
            },
            notification: {
                approved_success: '评论审核通过',
                approved_error: '错误: 评论未进行审核',
                rejected_success: '评论审核未通过',
                rejected_error: '错误: 评论未被拒绝',
            },
        },
        segments: {
            name: '群组',
            fields: {
                customers: '用户',
                name: '姓名',
            },
            data: {
                compulsive: 'Compulsive',
                collector: 'Collector',
                ordered_once: 'Ordered once',
                regular: 'Regular',
                returns: 'Returns',
                reviewer: 'Reviewer',
            },
        },
        user: {
            name: '信息维护',
            fields: {
                qq: 'QQ',
                email: '电子邮箱',
                username: '用户名',
                student_no: '学号',
                school: '学校',
                telephone: '手机号',
                id_card: '身份证号',
                name: '真实姓名',
            }
        },
        bills: {
            name: '订单记录',
            fields: {
                id: '订单编号',
                amount: '金额',
                time: '更新时间',
                type: '支付类型',
                status: '订单状态',

            },
        },
        templates: {
            name: '短信模版',
            fields: {
                id: '模版编号',
                group: '所属圈子',
                content: '模板内容',
                status: '审核状态',
            },
        },
    },
};
