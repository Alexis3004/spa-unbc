<script setup>
import { ref } from 'vue'

const props = defineProps({
    containerClasses: {
        type: String,
        default: 'relative border border-black rounded-full shadow-sm'
    },
    inputClasses: {
        type: String,
        default:
            'block font-inherit outline-0 w-full rounded-full border-black py-1 pl-4 pr-12 h-8 base-input'
    },
    buttonContainerClasses: {
        type: String,
        default: 'flex items-center absolute inset-y-0 right-0'
    },
    buttonClasses: {
        type: [String, Object],
        default:
            'flex justify-center items-center rounded-r-full text-white bg-accent-color p-2 h-full'
    },
    modelValue: {
        type: String,
        default: ''
    },
    maxlength: {
        type: String,
        default: null
    },
    disabled: {
        type: Boolean,
        default: false
    },
    placeholder: {
        type: String,
        default: 'Buscar'
    }
})

const isFocus = ref(false)
const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'buscar', 'enter', 'click'])

const updateModel = event => {
    if (event.target.value.lastIndexOf(' ') > event.target.value.lastIndexOf('\n') + 1) {
        event.target.value = event.target.value.replace(/\s+/g, ' ')
    }
    event.target.value = event.target.value.trimStart()
    if (props.maxlength && event.target.value.length > Number(props.maxlength)) {
        event.target.value = event.target.value.substring(0, props.maxlength)
    }
    emit('update:modelValue', event.target.value.toString() || '')
    emit('buscar')
}

const handleEmit = emitValue => {
    if (props.disabled) return
    emit(emitValue)
}

const triggerFocus = event => {
    isFocus.value = true
    emit('focus', event)
}

const triggerBlur = event => {
    isFocus.value = false
    emit('blur', event)
}
</script>

<template>
    <div :class="containerClasses">
        <input
            type="text"
            :value="modelValue"
            autocomplete="off"
            :class="inputClasses"
            :placeholder="placeholder"
            :maxlength="maxlength"
            :disabled="disabled"
            @keyup.enter="handleEmit('enter')"
            @input="updateModel"
            @blur="triggerBlur"
            @focus="triggerFocus"
        />
        <div :class="buttonContainerClasses">
            <button :class="buttonClasses" :disabled="disabled" @click="(e) => handleEmit('click', e)">
                <i class="px-1 fas fa-search"></i>
            </button>
        </div>
    </div>
</template>

<style></style>
