require 'csv'

class CsvExportJob < ApplicationJob
  queue_as :default
  # Disable retries
  sidekiq_options retry: false

  def perform(file_path, users)
    Rails.logger.info("CsvExportJob started for #{file_path} with users: #{users.map(&:id)}")

    # Your CSV export logic here...
    CSV.open(file_path, 'w') do |csv|
      # Write CSV headers
      csv << %w[avatar full_name role dob location email]

      # Write student data
      users.each do |user|
        csv << [user.avatar, user.full_name, user.role, user.dob, user.location, user.email]
      end
    end

    # Notify the user or perform any other necessary actions.
    # You might want to use ActionMailer to send an email with a download link, for instance.
    UserMailer.csv_export_notification(file_path).deliver_later
    Rails.logger.info("CsvExportJob finished for #{file_path}")
  end
end
