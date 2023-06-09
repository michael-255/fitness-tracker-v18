<script setup lang="ts">
import { date } from 'quasar'
import { onMounted, type Ref, ref } from 'vue'
import { Field } from '@/types/database'
import { Icon } from '@/types/icons'
import useActionStore from '@/stores/action'

// Props & Emits
const props = defineProps<{
  field: Field
  label: string
  getDefault: () => any
}>()

// Composables & Stores
const actionStore = useActionStore()

// Data
const displayDate: Ref<string | undefined> = ref('')
const datePicker: Ref<string> = ref('')
const timePicker: Ref<string> = ref('')

onMounted(() => {
  const existingTime = actionStore.record[props.field] ?? props.getDefault()
  datePicker.value = date.formatDate(existingTime, 'ddd MMM DD YYYY')
  timePicker.value = date.formatDate(existingTime, 'HH:mm:00')
  updateDisplayDate(existingTime)
})

/**
 * Updates the displayed date model value and the action record store.
 * @param timestamp
 */
function updateDisplayDate(timestamp: number = props.getDefault()) {
  actionStore.record[props.field] = timestamp
  displayDate.value = date.formatDate(timestamp, 'ddd, YYYY MMM Do, h:mm A')
}

/**
 * If a picker time exists, sets display date and model ref to the picker time.
 */
function onPickerUpdate() {
  if (datePicker.value && timePicker.value) {
    const dateTimestamp = new Date(`${datePicker.value} ${timePicker.value}`).getTime()
    updateDisplayDate(dateTimestamp)
  }
}

/**
 * Clears the displayed date and action record date for the finished timestamp.
 */
function clearDates(): void {
  actionStore.record[props.field] = undefined
  displayDate.value = undefined
}
</script>

<template>
  <QCard>
    <QCardSection>
      <p class="text-h6">{{ label }}</p>

      <QInput v-model="displayDate" dense outlined disable color="primary" hint="Auto formatted">
        <template v-slot:after>
          <!-- Date Picker -->
          <QBtn :icon="Icon.CALENDAR_DATE" color="primary" class="q-px-sm">
            <QPopupProxy>
              <QDate v-model="datePicker" mask="ddd MMM DD YYYY">
                <div class="row items-center justify-end q-gutter-sm">
                  <QBtn label="Cancel" flat v-close-popup />
                  <QBtn label="OK" color="primary" flat @click="onPickerUpdate()" v-close-popup />
                </div>
              </QDate>
            </QPopupProxy>
          </QBtn>

          <!-- Time Picker -->
          <QBtn :icon="Icon.CLOCK" color="primary" class="q-ml-sm q-px-sm">
            <QPopupProxy>
              <QTime v-model="timePicker" mask="HH:mm:00" now-btn>
                <div class="row items-center justify-end q-gutter-sm">
                  <QBtn label="Cancel" flat v-close-popup />
                  <QBtn label="OK" color="primary" flat @click="onPickerUpdate()" v-close-popup />
                </div>
              </QTime>
            </QPopupProxy>
          </QBtn>

          <!-- Set DateTime to now -->
          <QBtn
            v-if="field === Field.TIMESTAMP"
            :icon="Icon.CALENDAR_CHECK"
            color="positive"
            class="q-ml-sm q-px-sm"
            @click="updateDisplayDate()"
          />
          <!-- Clear DateTime (Field.FINISHED_TIMESTAMP) -->
          <QBtn
            v-else
            :icon="Icon.CALENDAR_CLEAR"
            color="negative"
            class="q-ml-sm q-px-sm"
            @click="clearDates()"
          />
        </template>
      </QInput>
    </QCardSection>
  </QCard>
</template>
