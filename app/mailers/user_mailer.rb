class UserMailer < ApplicationMailer
  def csv_export_notification(file_path)
    @file_path = file_path

    # Attach the CSV file to the email

    attachments['students.csv'] = File.read(file_path) if File.exist?(file_path)

    mail(to: 'd0nd0nkeyx@gmail.com', subject: 'Students CSV export is ready for download.', body: 'Email body') do | format |
      format.html
    end

    # Add logging statements

    Rails.logger.info('Email sent successfully to d0nd0nkeyx@gmail.com')
  rescue StandardError => e
    # Capture and log any exceptions that occur during email sending

    Rails.logger.error("Error sending email: #{e.message}")

    raise e # Re-raise the exception for further investigation
  end

  # Preview method

  def preview
    csv_export_notification
  end
end
