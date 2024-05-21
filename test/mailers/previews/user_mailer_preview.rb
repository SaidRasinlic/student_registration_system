# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview
  def csv_export_notification
    file_path = 'C:/Users/Said/Documents/VSCodeProjects/student_registration_system/exports/students_1708530177.csv '
    UserMailer.csv_export_notification(file_path)
  end
end
