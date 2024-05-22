<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    containerClasses: {
        type: String,
        default: 'relative'
    },
    inputGroupClasses: {
        type: String,
        default: 'relative w-full'
    },
    labelClasses: {
        type: String,
        default: ''
    },
    optionClasses: {
        type: String,
        default: ''
    },
    defaultOptionClasses: {
        type: String,
        default: ''
    },
    labelFocusClasses: {
        type: String,
        default: 'font-app-semibold text-black'
    },
    inputClasses: {
        type: String,
        default:
            'appearance-none bg-[length:10px] bg-no-repeat bg-[calc(100%-8px)_50%] arrow flex flex-auto font-inherit bg-white outline-0 border border-gray-300 rounded-sm pl-2 pr-7 py-1 w-full h-8 base-input'
    },
    errorMessageClasses: {
        type: String,
        default: 'flex'
    },
    options: {
        type: Array,
        default: function () {
            return []
        }
    },
    defaultOption: {
        type: Object,
        default: () => ({
            id: '',
            valor: 'Seleccionar',
            visible: true
        })
    },
    label: {
        type: String,
        default: null
    },
    modelValue: {
        type: [String, Number],
        default: ''
    },
    error: {
        type: Boolean,
        default: false
    },
    errors: {
        type: Array,
        default: function () {
            return []
        }
    },
    showError: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    readonly: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus'])

const isFocus = ref(false)

const triggerFocus = event => {
    isFocus.value = true
    emit('focus', event)
}

const triggerBlur = event => {
    isFocus.value = false
    emit('blur', event)
}

const errorMessage = computed(() => {
    if (props.errors.length === 0) {
        return 'No válido.'
    }
    return props.errors[0].$message
})

const value = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})
</script>

<template>
    <div v-bind="{ error: error }" :class="containerClasses">
        <div :class="inputGroupClasses">
            <div v-if="label" :class="labelClasses">
                <label :class="[isFocus ? labelFocusClasses : '']"> {{ label }}</label>
            </div>
            <select
                v-model="value"
                :class="[inputClasses, !value ? defaultOptionClasses : '']"
                :disabled="disabled"
                :readonly="readonly"
                @focus="triggerFocus"
                @blur="triggerBlur"
            >
                <option
                    :class="optionClasses"
                    v-if="defaultOption.id !== undefined"
                    v-show="defaultOption.visible"
                    :value="defaultOption.id"
                    :disabled="!defaultOption.visible"
                >
                    {{ defaultOption.valor }}
                </option>
                <option
                    v-for="(item, index) in options"
                    :key="index"
                    :value="item.id"
                    :class="optionClasses"
                >
                    {{ item.valor }}
                </option>
            </select>
        </div>

        <span :class="errorMessageClasses" v-if="error && showError">
            {{ errorMessage }}
        </span>
    </div>
</template>

<style lang="scss" scoped></style>
