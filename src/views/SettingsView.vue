<script setup lang="ts">
import { exportFile } from 'quasar'
import { Icon } from '@/types/icons'
import { type BackupData, AppName, Limit, LogRetention } from '@/types/general'
import { type Setting, Type, Key } from '@/types/database'
import { type Ref, ref, onUnmounted } from 'vue'
import { useMeta } from 'quasar'
import DataSchema from '@/services/DataSchema'
import useLogger from '@/composables/useLogger'
import useNotifications from '@/composables/useNotifications'
import useDialogs from '@/composables/useDialogs'
import useDefaults from '@/composables/useDefaults'
import useRoutables from '@/composables/useRoutables'
import ResponsivePage from '@/components/ResponsivePage.vue'
import DB from '@/services/Database'

useMeta({ title: `${AppName} - Settings` })

// Composables & Stores
const { log } = useLogger()
const { notify } = useNotifications()
const { confirmDialog } = useDialogs()
const {
  onAddBarbellStrengthWorkouts,
  onAddStretchRoutine,
  onAddCarpalTunnelRoutine,
  onAddDeepBreathingRoutine,
  onAddStandardMeasurements,
} = useDefaults()
const { goToData } = useRoutables()

// Data
const typeOptions = DataSchema.getTypeOptions()
const settings: Ref<Setting[]> = ref([])
const logRetentionIndex: Ref<number> = ref(0)
const heightInputRef: Ref<any> = ref(null)
const heightInches: Ref<number> = ref(1)
const importFile: Ref<any> = ref(null)
const exportModel: Ref<Type[]> = ref([])
const exportOptions = [...typeOptions]
const accessOptions = ref([...typeOptions])
const accessModel = ref(accessOptions.value[0])
const deleteOptions = ref([...typeOptions])
const deleteModel = ref(deleteOptions.value[0])

// Subscriptions
const subscription = DB.liveSettings().subscribe({
  next: (liveSettings) => {
    settings.value = liveSettings

    const logRetentionTime = liveSettings.find((s) => s.key === Key.LOG_RETENTION_TIME)?.value
    logRetentionIndex.value = Object.values(LogRetention).findIndex((i) => i === logRetentionTime)

    heightInches.value = settings.value.find((s) => s.key === Key.USER_HEIGHT)?.value as number
  },
  error: (error) => {
    log.error('Error fetching live Settings', error)
  },
})

onUnmounted(() => {
  subscription.unsubscribe()
})

/**
 * Generates example logs that can be examined in the database and console.
 */
function onTestLogger() {
  log.debug('This is a Debug Log', { name: 'Debug' })
  log.info('This is an Info Log', { name: 'Info' })
  log.warn('This is a Warning Log', { name: 'Warning' })
  log.error('This is an Error Log', { name: 'Error' })
}

/**
 * Called when a file has been rejected by the input.
 * @param entries
 */
function onRejectedFile(entries: any) {
  const fileName = entries[0]?.importFile?.name || undefined
  log.warn(`Cannot import"${fileName}`, entries)
}

/**
 * On confirmation, imports your data from a JSON file.
 */
function onImportFile() {
  confirmDialog(
    'Import',
    `Import backup data from ${importFile?.value?.name} and attempt to load records into the database from it?`,
    Icon.INFO,
    'info',
    async () => {
      try {
        const backupData = JSON.parse(await importFile.value.text()) as BackupData

        log.silentDebug('backupData:', backupData)

        // Do NOT allow importing data from another app
        if (backupData.appName !== AppName) {
          throw new Error(`Cannot import data from this app: ${backupData.appName} `)
        }

        // Never import logs, settings is handled next if included
        const types = Object.values(Type).filter(
          (type) => type !== Type.LOG && type !== Type.SETTING
        )

        // Import settings first in case errors stop type importing below
        if (backupData[Type.SETTING].length > 0) {
          // Settings must be explicitly set to be updated
          await Promise.all(
            backupData[Type.SETTING]
              .filter((s) => Object.values(Key).includes(s.key as Key))
              .map(async (s) => await DB.setSetting(s.key as Key, s.value))
          )
        }

        await Promise.all(types.map((type) => DB.importRecords(type, backupData[type])))

        importFile.value = null // Clear input
        log.info('Successfully imported available data')
      } catch (error) {
        log.error('Error during import', error)
      }
    }
  )
}

/**
 * On confirmation, exports your records as a JSON file.
 */
function onExportRecords() {
  // Build export file name
  const appNameSlug = AppName.toLowerCase().split(' ').join('-')
  const date = new Date().toISOString().split('T')[0]
  const filename = `export-${appNameSlug}-${date}.json`

  confirmDialog(
    'Export',
    `Export all selected record types into the file ${filename}?`,
    Icon.INFO,
    'info',
    async () => {
      try {
        const types = exportModel.value

        const getTypeData = async (type: Type) => {
          return types.includes(type) ? await DB.getAll(type) : []
        }

        // Build backup data
        const backupData = {
          appName: AppName,
          backupTimestamp: Date.now(),
          [Type.LOG]: await getTypeData(Type.LOG),
          [Type.SETTING]: await getTypeData(Type.SETTING),
          [Type.WORKOUT]: await getTypeData(Type.WORKOUT),
          [Type.EXERCISE]: await getTypeData(Type.EXERCISE),
          [Type.MEASUREMENT]: await getTypeData(Type.MEASUREMENT),
          [Type.WORKOUT_RESULT]: await getTypeData(Type.WORKOUT_RESULT),
          [Type.EXERCISE_RESULT]: await getTypeData(Type.EXERCISE_RESULT),
          [Type.MEASUREMENT_RESULT]: await getTypeData(Type.MEASUREMENT_RESULT),
        } as BackupData

        log.silentDebug('backupData:', backupData)

        // Attempt to download the export records as a JSON file
        const fileStatus = exportFile(filename, JSON.stringify(backupData), {
          encoding: 'UTF-8',
          mimeType: 'application/json',
        })

        if (fileStatus === true) {
          log.info('File downloaded successfully', { filename })
        } else {
          throw new Error('Browser denied file download')
        }
      } catch (error) {
        log.error('Export failed', error)
      }
    }
  )
}

/**
 * Updates the log retention time in the database.
 * @param logRetentionIndex
 */
async function onChangeLogRetention(logRetentionIndex: number) {
  try {
    const logRetentionTime = Object.values(LogRetention)[logRetentionIndex]
    await DB.setSetting(Key.LOG_RETENTION_TIME, logRetentionTime)
    log.info('Updated log retention time', { time: logRetentionTime, index: logRetentionIndex })
  } catch (error) {
    log.error('Log retention update failed', error)
  }
}

/**
 * On confirmation, reset all your app Settings.
 */
async function onResetSettings() {
  confirmDialog(
    'Reset Settings',
    'Would you like to reset your app Settings to the defaults? This does not impact your data.',
    Icon.REFRESH,
    'primary',
    async () => {
      try {
        await DB.resetSettings()
        log.info('Successfully reset settings')
      } catch (error) {
        log.error('Error reseting settings', error)
      }
    }
  )
}

/**
 * On confirmation, deletes all records of a specified type.
 * @param type
 */
async function onDeleteBy(label: string, type: Type) {
  confirmDialog(
    `Delete ${label}`,
    `Permanetly delete all ${label} from the database?`,
    Icon.CLEAR,
    'negative',
    async () => {
      try {
        await DB.clearByType(type)
        log.info(`${type} successfully deleted`)
      } catch (error) {
        log.error(`Error deleting ${label}`, error)
      }
    }
  )
}

/**
 * On confirmation, deletes all records of any type from the database. Re-initializes the settings.
 */
async function onDeleteAll() {
  confirmDialog(
    'Delete All',
    'Permanetly delete all data from the database?',
    Icon.CLEAR,
    'negative',
    async () => {
      try {
        await DB.clearAllData()
        log.info('All data successfully deleted')
      } catch (error) {
        log.error('Error deleting all data', error)
      }
    }
  )
}

/**
 * On confirmation, completely deletes the database and all of its data (must reload the app after).
 */
async function onDeleteDatabase() {
  confirmDialog(
    'Delete Database',
    'Delete the underlining database? All data will be lost. You must reload the website after this action to reinitialize the database.',
    Icon.CLEAR,
    'negative',
    async () => {
      try {
        await DB.deleteDatabase()
        notify('Reload the website now', Icon.WARN, 'warning')
      } catch (error) {
        log.error('Database deletion failed', error)
      }
    }
  )
}

/**
 * Returns value of setting from the live ref.
 * @param key
 */
function getSettingValue(key: Key) {
  return settings.value.find((s) => s.key === key)?.value
}

/**
 * Updates the user height in the database when the input is valid.
 */
async function updateHeight() {
  const isValid = !!heightInputRef?.value?.validate()

  if (isValid) {
    await DB.setSetting(Key.USER_HEIGHT, heightInches.value)
  }
}
</script>

<template>
  <ResponsivePage :bannerIcon="Icon.SETTINGS" bannerTitle="Settings">
    <!-- User Information -->
    <QCard class="q-mb-md">
      <QCardSection>
        <div class="text-h6 q-mb-md">User Information</div>

        <p>
          Your height is used for the BMI calculation when updating your body weight. Height will
          default to 70 inches if not provided. For reference, a height of 5'10" is equal to 70
          inches.
        </p>

        <p class="text-h6">Height</p>

        <!-- Note: v-model.number for number types -->
        <QInput
          v-model.number="heightInches"
          ref="heightInputRef"
          :rules="[(val: number) => (val >= 1 && val <= 120) || 'Must be 1-120 or blank']"
          hint="Auto Saved"
          type="number"
          placeholder="Total Inches"
          dense
          outlined
          color="primary"
          @blur="updateHeight()"
        />
      </QCardSection>
    </QCard>

    <!-- Options -->
    <QCard class="q-mb-md">
      <QCardSection>
        <p class="text-h6">Options</p>

        <div class="q-mb-md">
          <p>Reset your app Settings to the defaults without impacting any of your data.</p>
          <QBtn label="Reset Settings" color="primary" @click="onResetSettings()" />
        </div>

        <div class="q-mb-md">
          <p>
            Welcome overlay provides helpful instructions on basic app usage on the Dashboard page.
          </p>
          <QToggle
            label="Show Welcome Overlay"
            :model-value="getSettingValue(Key.SHOW_WELCOME)"
            @update:model-value="DB.setSetting(Key.SHOW_WELCOME, $event)"
          />
        </div>

        <div class="q-mb-md">
          <p>Show descriptions for records displayed on the Dashboard page.</p>
          <QToggle
            label="Show Dashboard Descriptions"
            :model-value="getSettingValue(Key.SHOW_DESCRIPTIONS)"
            @update:model-value="DB.setSetting(Key.SHOW_DESCRIPTIONS, $event)"
          />
        </div>

        <div>
          <p>Dark mode allows you to switch between a light or dark theme for the app.</p>
          <QToggle
            label="Dark Mode"
            :model-value="getSettingValue(Key.DARK_MODE)"
            @update:model-value="DB.setSetting(Key.DARK_MODE, $event)"
          />
        </div>
      </QCardSection>
    </QCard>

    <!-- Defaults -->
    <QCard class="q-mb-md">
      <QCardSection>
        <p class="text-h6">Defaults</p>

        <p>
          You can add default workouts, exercises, and measurements to the database below if you
          don't feel like creating your own.
        </p>

        <div class="q-mb-md">
          <QBtn
            label="Barbell Strength Workouts"
            color="primary"
            @click="onAddBarbellStrengthWorkouts()"
          />
        </div>

        <div class="q-mb-md">
          <QBtn label="Stretch Routine" color="primary" @click="onAddStretchRoutine()" />
        </div>

        <div class="q-mb-md">
          <QBtn label="Carpal Tunnel Routine" color="primary" @click="onAddCarpalTunnelRoutine()" />
        </div>

        <div class="q-mb-md">
          <QBtn
            label="Deep Breathing Routine"
            color="primary"
            @click="onAddDeepBreathingRoutine()"
          />
        </div>

        <div>
          <QBtn
            label="Standard Measurements"
            color="primary"
            @click="onAddStandardMeasurements()"
          />
        </div>
      </QCardSection>
    </QCard>

    <!-- Data Management -->
    <QCard class="q-mb-md">
      <QCardSection>
        <p class="text-h6">Data Management</p>

        <div class="q-mb-md">
          <p>
            Import data into the database from a JSON file. The app expects the data in the file to
            be structured the same as the exported version.
          </p>
          <QFile
            v-model="importFile"
            dense
            outlined
            counter
            bottom-slots
            label="File Select"
            :max-file-size="Limit.MAX_FILE_SIZE"
            accept="application/json"
            @rejected="onRejectedFile"
          >
            <template v-slot:before>
              <QBtn :disable="!importFile" label="Import" color="primary" @click="onImportFile()" />
            </template>
            <template v-slot:append>
              <QIcon
                v-if="importFile"
                :name="Icon.CLOSE"
                class="cursor-pointer"
                @click.stop="importFile = null"
              />
            </template>
          </QFile>
        </div>

        <div class="q-mb-md">
          <p>
            Export the selected data types as a JSON file. Do this on a regularly basis so you have
            a backup of your data.
          </p>
          <QOptionGroup
            class="q-mb-md"
            v-model="exportModel"
            :options="exportOptions"
            type="checkbox"
            inline
          />
          <QBtn
            :disable="exportModel.length === 0"
            label="Export"
            color="primary"
            @click="onExportRecords()"
          />
        </div>

        <div class="q-mb-md">
          <p>Access any app data types to view the records or troubleshoot issues.</p>
          <QSelect
            v-model="accessModel"
            outlined
            dense
            label="Record Type"
            :options="accessOptions"
          >
            <template v-slot:before>
              <QBtn
                :disable="!accessModel"
                label="Access Data"
                color="primary"
                @click="goToData(accessModel.value)"
              />
            </template>
          </QSelect>
        </div>
      </QCardSection>
    </QCard>

    <!-- Logging -->
    <QCard class="q-mb-md">
      <QCardSection>
        <p class="text-h6">Logging</p>

        <div class="q-mb-md">
          <p>Show Console Logs will display all log messages in the browser console.</p>
          <QToggle
            label="Show Console Logs"
            :model-value="getSettingValue(Key.SHOW_CONSOLE_LOGS)"
            @update:model-value="DB.setSetting(Key.SHOW_CONSOLE_LOGS, $event)"
          />
        </div>

        <div class="q-mb-md">
          <p>Show Info Messages will display info level notifications.</p>
          <QToggle
            label="Show Info Messages"
            :model-value="getSettingValue(Key.SHOW_INFO_MESSAGES)"
            @update:model-value="DB.setSetting(Key.SHOW_INFO_MESSAGES, $event)"
          />
        </div>

        <div class="q-mb-md">
          <p>
            Validate that your logging settings above are working as expected by using the test
            action below.
          </p>
          <QBtn label="Test Logger" color="primary" @click="onTestLogger()" />
        </div>

        <div class="q-mb-md">
          <p>
            Change log retention time below. Logs older than the selected time will be deleted. This
            functions retroactivley, so if you change the time to 3 months, all logs older than 3
            months will be deleted. Expired log processing occurs every time the app is loaded.
          </p>
          <QSlider
            v-model="logRetentionIndex"
            :label-value="Object.values(LogRetention)[logRetentionIndex]"
            color="primary"
            markers
            label-always
            switch-label-side
            :min="0"
            :max="Object.values(LogRetention).length - 1"
            @change="(index) => onChangeLogRetention(index)"
          />
        </div>
      </QCardSection>
    </QCard>

    <!-- DANGER ZONE -->
    <QCard class="q-mb-md">
      <QCardSection>
        <p class="text-h6 text-negative">DANGER ZONE</p>

        <p>
          The following operations cannot be undone. Consider exporting your data before proceeding.
        </p>

        <div class="q-mb-md">
          <p>Select a data type and permanently delete all of its records.</p>
          <QSelect
            v-model="deleteModel"
            outlined
            dense
            label="Record Type"
            :options="deleteOptions"
          >
            <template v-slot:before>
              <QBtn
                :disable="!deleteModel"
                label="Delete Data"
                color="negative"
                @click="onDeleteBy(deleteModel.label, deleteModel.value)"
              />
            </template>
          </QSelect>
        </div>

        <div class="q-mb-md">
          <p>Permanently delete all data records from the database.</p>
          <QBtn label="Delete All Data" color="negative" @click="onDeleteAll()" />
        </div>

        <div class="q-mb-md">
          <p>Delete the underlining database and all of its data (requires website reload).</p>
          <QBtn label="Delete Database" color="negative" @click="onDeleteDatabase()" />
        </div>
      </QCardSection>
    </QCard>
  </ResponsivePage>
</template>
