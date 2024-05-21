// This file is auto-generated by ./bin/rails stimulus:manifest:update
// Run that command whenever you add a new controller or create them with
// ./bin/rails generate stimulus controllerName

import { application } from "./application"

import CsvExportController from "./csv_export_controller"
application.register("csv-export", CsvExportController)

import FormController from "./form_controller"
application.register("form", FormController)

import ImportCsvController from "./import_csv_controller"
application.register("import-csv", ImportCsvController)

import LoginRegisterController from "./login_register_controller"
application.register("login-register", LoginRegisterController)

import RemovalsController from "./removals_controller"
application.register("removals", RemovalsController)

import StudentController from "./student_controller"
application.register("student", StudentController)

import TurboModalController from "./turbo_modal_controller"
application.register("turbo-modal", TurboModalController)