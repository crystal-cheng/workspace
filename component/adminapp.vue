<template>
    <li class="app" @mouseenter="enter" @mouseleave="leave" :style="style.appStyle" :class="{hover: hover}">
        <a class="main-href">
            <section class="top">
                <span class="icon" :style="style.iconCircleStyle">
                    <i class="fa fa-globe"  :style="style.iconStyle"></i>
                </span>
            </section>
            <section class="bottom">
                <div class="basic">
                    <p class="name">系统管理</p>
                    <p class="description">系统常用配置</p>
                </div>

                <transition name="slide">
                    <div class="subs-con" v-if="hover">
                        <a class="app-name">系统管理</a>
                        <div class="subs clearfix">
                            <span class="sub" v-for="sub in subs">
                                <a :title="sub.name" :href="sub.link">{{sub.name}}</a>
                            </span>
                        </div>
                    </div>
                </transition>
            </section>
        </a>
    </li>
</template>

<style>
    .app {
        float: left;
        position: relative;
        box-shadow: 0 2px 6px #d5e4ec;
        border-radius: 5px;
        width: 300px;
        height: 360px;
        background: #fff;
        margin-left: 15px;
        margin-bottom: 15px;

        &.app-add {
            height: 50px;
            text-align: center;
            background-size: 110px 110px;
            cursor: pointer;
            background-color: #E3E5E6;
            line-height:50px;
            color:#7f8fa4
        }

        .main-href {
            display: block;
            height: 100%;
        }

        .top,
        .bottom {
            height: 50%;
            overflow: hidden;
        }

        .icon {
            display: block;
            height: 120px;
            width: 120px;
            border-radius: 50%;
            box-shadow: #e3e3e3 0px 4px 10px 0px;
            margin: 40px auto 0;
            text-align: center;
            line-height: 120px;
            font-size: 50px;
            color: #fff;
        }


        /* 不可通过:hover直接操作，vue-sortable拖动时会产生hover状态混乱,sub-con同理 */
        &.hover .count {
            color: #ff515f;
            background-image: url(../img/notice-hover.png);
        }

        .name {
            font-size: 24px;
            text-align: center;
            color: #6c7279;
            margin-top: 25px;
            word-wrap: break-word;
        }

        .description {
            padding: 20px 35px;
            color: #777;
            overflow: hidden;
            word-wrap: break-word;
            word-break: normal;
            font-size: 13px;
            line-height: 1.5;
        }

        .bottom {
            position: relative;
        }

        .subs-con {
            position: absolute;
            color: #777;
            background: url('../img/sub-bg.png') no-repeat;
            height: 100%;
            overflow: hidden;
            top: 100%;
            left: 0;
            right: 0;

            a:hover {
                text-decoration: underline;
            }
        }

        &.hover .subs-con {
            top: 0;
        }

        .app-name {
            display: block;
            font-size: 18px;
            color: inherit;
            padding-left: 30px;
            padding-right: 30px;
            margin-top: 30px;
            word-wrap: break-word;
        }

        .subs {
            padding: 10px 30px;
        }

        .sub {
            display: block;
            box-sizing: border-box;
            float: left;
            font-size: 15px;
            width: 50%;
            height: 30px;
            line-height: 30px;
            color: inherit;

            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;

            a {
                color: inherit;
            }

            &:nth-child(odd) {
                padding-right: 5px;
            }

            &:nth-child(even) {
                padding-left: 5px;
            }
        }

        .slide-enter-active {
            animation: .5s slide-in;
        }

        .slide-leave-active {
            animation: .5s slide-out;
        }

        @keyframes slide-in {
            0% {
                top: 100%;
            }

            100% {
                top: 0;
            }
        }

        @keyframes slide-out {
            0% {
                top: 0;
            }

            100% {
                top: 100%;
            }
        }
    }
</style>

<script>
    // app主题色/shadow
    let shadow = '0px 4px 10px 0px ';
    const _appColor = [
        {
            color: '#ff6e6e',
            boxShadow: `${shadow}#ff3838`
        }
    ];

    export default {
        props: ['app'],
        data: function() {
            let app = this.app;
            return {
                hover: false,
                color: _appColor[0],
                subs: app.subs,
            };
        },
        computed: {
            style: function() {
                let color = this.color;

                if (this.hover) {
                    return {
                        appStyle: {
                            background: color.color
                        },
                        iconCircleStyle: {
                            background: '#fff',
                            boxShadow: color.boxShadow
                        },
                        iconStyle: {
                            color: color.color
                        }
                    };
                }

                return {
                    appStyle: {
                        background: ''
                    },
                    iconCircleStyle: {
                        background: color.color,
                        boxShadow: ''
                    },
                    iconStyle: {
                        color: ''
                    }
                };
            }
        },
        methods: {
            enter: function() {
                this.hover = true;
            },
            leave: function() {
                this.hover = false;
            }
        }
    }
</script>