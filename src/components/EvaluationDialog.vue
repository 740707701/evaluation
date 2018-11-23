<template>
	<div class="eva-dialog">
		<div class="dialog-bg">
      <div class="prompt-dialog">
        <div class="title">{{dialogInfo.title}}</div>
        <div class="prompt-text" v-html="dialogInfo.message"></div>
        <div class="btn-box">
          <div class="operation-btn cancel-btn" v-if="dialogInfo.cancelButtonText" @click="cancel">{{dialogInfo.cancelButtonText}}</div>
          <div class="operation-btn confirm-btn" v-if="dialogInfo.confirmButtonText" @click="confirm">{{dialogInfo.confirmButtonText}}</div>
        </div>
      </div>
    </div>
	</div>
</template>
<script>
export default {
	name: 'evaDialog',
	data() {
		return {}
	},
	props: ['dialogInfo'],
	methods: {
		cancel() {
			this.$emit('dialogCancelEvent')
		},
		confirm() {
			this.$emit('dialogConfirmEvent')
		}
	}
}
</script>
<style lang="less" scoped>
.eva-dialog {
	.dialog-bg {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 21;
		.prompt-dialog {
			width: 35%;
			min-height: 270px;
			padding: 40px;
			background-color: #fff;
			border-radius: 8px;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			.title {
				font-size: 20px;
				color: #FF2D2D;
				text-align: center;
				margin-bottom: 30px;
			}
			.prompt-text {
				font-size: 16px;
				color: #666;
				line-height: 24px;
				margin-bottom: 50px;
			}
			.btn-box {
				width: 100%;
				text-align: center;
				position: absolute;
				bottom: 40px;
				left: 0;
				.operation-btn {
					width: 164px;
					height: 40px;
					line-height: 40px;
					text-align: center;
					border-radius: 4px;
					font-size: 14px;
					cursor: pointer;
					display: inline-block;
				}
				.cancel-btn {
					background-color: #ececec;
					color: #666;
					margin-right: 30px;
				}
				.confirm-btn {
					background-color: #477CED;
					color: #fff;
				}
			}
		}
	}
}
</style>


