<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    containerClasses: {
        type: String,
        default: 'relative'
    },
    inputGroupClasses: {
        type: String,
        default: 'w-full'
    },
    labelClasses: {
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
            'flex flex-auto font-inherit bg-white outline-0 border border-gray-300 rounded-sm p-1 w-full h-8 base-input'
    },
    errorMessageClasses: {
        type: String,
        default: 'flex'
    },
    label: {
        type: String,
        default: null
    },
    type: {
        type: String,
        default: 'text'
    },
    autocomplete: {
        type: String,
        default: 'off'
    },
    modelValue: {
        type: String,
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
    },
    maxlength: {
        type: String,
        default: null
    },
    placeholder: {
        type: String,
        default: ''
    },
    placeholderFontSize: {
        type: String,
        default: 'inherit'
    }
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus'])

const isFocus = ref(false)

const triggerFocus = (event) => {
    isFocus.value = true
    emit('focus', event)
}

const triggerBlur = (event) => {
    isFocus.value = false
    emit('blur', event)
}

const errorMessage = computed(() => {
    if (props.errors.length === 0) {
        return 'No válido.'
    }
    return props.errors[0].$message
})

const updateModel = (event) => {
    if (props.maxlength && event.target.value.length > Number(props.maxlength)) {
        event.target.value = event.target.value.substring(0, props.maxlength)
    }
    emit('update:modelValue', event.target.value.toString() || '')
}
</script>

<template>
    <div v-bind="{ error: error }" :class="containerClasses">
        <div :class="inputGroupClasses">
            <div v-if="label" :class="labelClasses">
                <label :class="[isFocus ? labelFocusClasses : '']"> {{ label }} </label>
                <slot></slot>
            </div>
            <input
                :class="inputClasses"
                :type="type"
                :autocomplete="autocomplete"
                :aria-autocomplete="'none'"
                :value="modelValue"
                :maxlength="maxlength"
                :readonly="readonly"
                :disabled="disabled"
                :placeholder="placeholder"
                class="customPlaceholder"
                @blur="triggerBlur"
                @focus="triggerFocus"
                @input="updateModel"
            />
        </div>

        <span :class="errorMessageClasses" v-if="error && showError">
            {{ errorMessage }}
        </span>
    </div>
</template>

<style lang="scss" scoped>
.customPlaceholder::placeholder {
    font-size: v-bind(placeholderFontSize);
}
</style>
