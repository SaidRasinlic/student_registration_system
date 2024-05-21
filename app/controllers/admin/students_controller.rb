require 'csv'
require 'open-uri'

class Admin::StudentsController < ApplicationController
  # before_action :turbo_frame_request_variant
  # before_action :validate_turbo_frame_request, only: [:import_export_modal]

  def index
    # @students = User.where(role: :student)
    # @pagy, @students = pagy(User.where(role: :student))
    @pagy, @students = pagy(User.includes(:avatar_attachment).where(role: :student).excluding(current_user))
  end

  def new
    @user = User.new

    respond_to do |format|
      format.html
      format.turbo_stream do
        render turbo_stream: turbo_stream.update('student-new', partial: 'admin/students/new', locals: { user: @user })
      end
      # render turbo_stream: turbo_stream.update('student-new', partial: 'admin/students/new', locals: { user: @user })

      # format.turbo_stream { render turbo_stream: turbo_stream.append('student-new', partial: 'students/new') }
    end
  end

  def destroy
    @student = User.find(params[:id])

    @student.destroy

    respond_to do |format|
      format.html { redirect_to quotes_path, flash: { alert: 'Student was successfully destroyed.' } }
      # format.turbo_stream { flash.now[:alert] = 'Student was successfully destroyed.' }
      format.turbo_stream do
        render turbo_stream: turbo_stream.update('flash', partial: 'shared/flash')
        # flash.discard
      end
    end
  end

  # def create
  #   @user = User.new(student_params)

  #   respond_to do |format|
  #     if @user.save
  #       format.html do
  #         flash[:notice] = 'Student was successfully created.'
  #         redirect_to admin_students_path
  #       end
  #       # format.html { redirect_to admin_students_path, flash: { notice: 'Student was successfully created.' } }
  #     else
  #       flash.now[:alert] = 'Student could not be created.'
  #       render :new, status: :unprocessable_entity
  #     end
  #   end
  # end
  def create
    Rails.logger.info('Im CALLED CREATESUTDENT')
    @user = User.new(student_params)
    @user.password = 'password' if @user.password.blank?
    # Set the current user as the current admin only if the user is an admin
    # @user.current_admin = current_user if current_user&.admin?
    respond_to do |format|
      if @user.save
        pagy, _students = pagy(User.where(role: :student).excluding(current_user))
        last_page = pagy.last

        flash.now[:notice] = 'Student was successfully created.'
        format.html { redirect_to admin_students_path }
        # format.turbo_stream { render turbo_stream: turbo_stream.update('flash', partial: 'shared/flash') }
        format.turbo_stream do
          render turbo_stream: [
            turbo_stream.append("students_page_#{last_page}", partial: 'admin/students/student',
                                                              locals: { student: @user }),
            turbo_stream.update('flash', partial: 'shared/flash')
            # turbo_stream.update('student-new', partial: 'admin/students/new', locals: { user: User.new })
          ]
          # render turbo_stream: [
          #   turbo_stream.update('student-new', partial: 'admin/students/new', locals: { user: @user }),
          # <%= turbo_stream.append "users", partial: 'admin/students/student', locals: { student: @user } %>
          #   turbo_stream.update('flash', partial: 'shared/flash')
          # ]
          # render turbo_stream: turbo_stream.update('student-new', partial: 'admin/students/new',
          #                                                         locals: { user: @user })
          # render turbo_stream: turbo_stream.update('flash', partial: 'shared/flash')
          # flash.discard
        end

        # format.turbo_stream do
        #   render turbo_stream: [
        #     turbo_stream.update('flash', partial: 'shared/flash')
        #   ]
        # end
        # format.turbo_stream.update('flash', partial: 'shared/flash')

      else
        flash.now[:alert] = 'Student could not be created.'
        format.html { render :new, status: :unprocessable_entity }
        format.turbo_stream do
          # render turbo_stream: turbo_stream.update('student-new', partial: 'admin/students/new',
          #                                                         locals: { user: @user })
          # render turbo_stream: [
          #   turbo_stream.append('users', partial: 'admin/students/student', locals: { student: @user }),
          #   turbo_stream.update('flash', partial: 'shared/flash'),
          #   turbo_stream.update('student-new', partial: 'admin/students/new', locals: { user: User.new })
          # ]
          render turbo_stream: turbo_stream.update('flash', partial: 'shared/flash')
          # flash.discard
        end
        # format.turbo_stream { render turbo_stream: turbo_stream.update('flash', partial: 'shared/flash') }
        # format.html { render :new, status: :unprocessable_entity }
      end
    end
  end
  # def create
  #   @user = User.new(student_params)

  #   respond_to do |format|
  #     if @user.save
  #       format.html do
  #         flash[:notice] = 'Student was successfully created.'
  #         redirect_to admin_students_path
  #       end
  #     else
  #       format.html do
  #         flash.now[:alert] = 'Student could not be created.'
  #         render :new, status: :unprocessable_entity
  #       end
  #     end
  #   end
  # end

  # def new
  #   # @user = current_user
  #   student = User.new
  #   respond_to do |format|
  #     format.html { render :new, locals: { student: student } }
  #   end
  # end

  # def create
  #   @student = User.new(student_params)
  #   # Here..
  #   if @student.save
  #     respond_to do |format|
  #       format.html { redirect_to quotes_path, flash: { success: 'Quote was successfully created.' } }
  #       format.turbo_stream { flash.now[:success] = 'Quote was successfully created.' }
  #     end
  #   else
  #     render :new, status: :unprocessable_entity
  #   end
  # end

  # def edit; end

  # def update; end

  # def show; end

  # def import_export_modal
  def modal
    # if turbo_frame_request?
    #   # render turbo_frame: 'modal'
    #   # render turbo_frame: 'modal', file: "#{Rails.root}/app/views/admin/students/modals/modal"
    #   render turbo_frame: 'modal', file: "#{Rails.root}/app/views/admin/students/modals/modal.html.erb"

    #   # , layout: false
    # else
    #   # Handle non-Turbo Frame requests, e.g., redirect or render an error page
    #   redirect_to root_path, alert: 'Invalid request'
    # end
    # Data here...

    # if turbo_frame_request?
    #   render 'admin/students/test'
    # else
    #   render 'admin/students/modals/modal'
    # end

    # respond_to do |format|
    # format.html do |variant|
    #   variant.turbo_frame { render 'admin/students/modals/modal' }
    # end
    # format.turbo_stream { render turbo_stream: turbo_stream.append('modal', partial: 'admin/students/modals/modal') }
    # end
    # if turbo_frame_request?
    #   render 'admin/students/modals/modal'
    # else
    #   redirect_to root_path, alert: 'Invalid request'
    # end
    render 'admin/students/modals/modal'
  end

  def import_modal
    render 'admin/students/modals/import_csv'
  end

  # def export_csv
  #   # Logic for CSV import goes here
  #   users = User.where(role: :student).to_a

  #   # Generate a unique filename for the CSV
  #   file_path = Rails.root.join('exports', "students_#{Time.now.to_i}.csv").to_s

  #   # Enqueue the CSV export job
  #   CsvExportJob.perform_later(file_path, users)
  #   flash[:notice] = 'CSV export job is enqueued. You will be notified when it is ready for download.'

  #   # redirect_to admin_students_path,
  #   #             notice: 'CSV export job is enqueued. You will be notified when it is ready for download.'
  #   # ...
  #   #  @students = Student.all

  #   # respond_to do |format|
  #   #   format.csv do
  #   #     send_data generate_csv(@students), filename: "students_export_#{Time.now.to_i}.csv"
  #   #   end
  #   # end
  #   # render 'admin/students/modals/export_csv'
  #   redirect_to admin_students_path
  # end

  # Instant download start ==========

  def export_csv
    # Logic for CSV import goes here
    users = User.where(role: :student).to_a

    # Generate CSV content
    csv_data = CSV.generate(headers: true) do |csv|
      csv << %w[avatar_url full_name email status verified dob location]

      # Write student data
      users.each do |user|
        csv << [user.avatar_url, user.full_name, user.email, user.status, user.verified, user.dob, user.location]
      end
    end
    # flash.now[:notice] = 'CSV download started. Check your downloads folder.'
    # Set up the response headers
    respond_to do |format|
      format.html do
        flash[:notice] = 'CSV download succeeded. Check your downloads folder.'
        redirect_to admin_students_path
      end
      format.csv do
        # send_data csv_data, filename: "students_export_#{Time.now.to_i}.csv"
        send_data csv_data, filename: "students_export_#{Time.now.to_i}.csv", type: 'text/csv',
                            disposition: 'attachment'

        puts 'LOGGED CSV CSV SCSV ========================================'
      end
      # format.turbo_stream do
      #   flash[:notice] = "Thing was successfully created"
      #   render turbo_stream: turbo_stream.action(:redirect, admin_student_path)
      # end
      #   # format.turbo_stream { flash.now[:notice] = "Quote was successfully created." }
    end
    # render 'admin/students/modals/export_csv'
    # turbo_stream.append 'flash_messages', content: render('shared/flash')
    # flash.keep if turbo_frame_request?
  end

  # Instant download end==========

  def process_csv
    # Logic for CSV import goes here
    # ...

    file = params[:import_file]

    respond_to do |format|
      format.html do
        if file.present?
          import_users_from_csv(file)
          flash[:success] = 'File is successfully imported.'
        else
          flash[:error] = 'File is required for item creation.'
        end
        redirect_to admin_students_path
      end
      # format.json do
      #   render json: "WOOOWOWOWO JSON HERE!"
      # end
    end
  end

  private

  def student_params
    # params.require(:user).permit(:full_name, :email)
    params.require(:user).permit(:full_name, :email, :password, :password_confirmation, :avatar, :dob, :verified,
                                 :location, :status)
  end

  def import_users_from_csv(file)
    users_to_insert = []

    CSV.foreach(file.path, headers: true) do |row|
      user = User.new(
        full_name: row['full_name'],
        email: row['email'],
        status: row['status'],
        verified: row['verified'],
        role: row['role'] || 'student',
        dob: row['dob'],
        location: row['location'],
        password: 'changeme123',
        default_auth_incomplete: true,
        imported_from_csv: true
      )

      if row['avatar_url'].present?
        # avatar_image = URI.open(row['avatar_url'], ssl_verify_mode: OpenSSL::SSL::VERIFY_NONE)
        avatar_image = URI.open(row['avatar_url'])
        user.avatar.attach(io: avatar_image,
                           filename: "avatar_#{Time.now.to_i}.#{avatar_image.content_type.split('/').last}")
        puts "Avatar attached for #{user.full_name}"
      end

      user.password_changed_at = 7.days.ago
      users_to_insert << user
    end

    User.import users_to_insert, on_duplicate_key_ignore: true

    # users_to_insert.each do |user|
    #   if user.save
    #     puts "User #{user.full_name} saved successfully."
    #   else
    #     puts "Error saving user #{user.full_name}: #{user.errors.full_messages.join(', ')}"
    #   end
    # end
  end

  # def import_users_from_csv(file)
  #   # def import_users_from_csv(file)
  #   #   p "#{file} --------------------------------------- hehehehehe"
  #   users_to_insert = []

  #   CSV.foreach(file.path, headers: true) do |row|
  #     # avatar.attach(io: URI.parse(avatar_url).open, filename: File.basename(avatar_url))
  #     users_to_insert << User.new(
  #       full_name: row['full_name'],
  #       # avatar: row["avatar"],
  #       email: row['email'],
  #       status: row['status'],
  #       verified: row['verified'],
  #       role: row['role'] || 'student',
  #       dob: row['dob'],
  #       location: row['location'],
  #       password: 'changeme123',
  #       default_auth_incomplete: true,
  #       imported_from_csv: true
  #       # password_changed_at: 7.days.ago, # Set expiration time (7 days in this example)
  #     ).tap do |user|
  #       user.avatar.attach(io: URI.parse(row['avatar_url']).open, filename: File.basename(row['avatar_url']))
  #       user.password_changed_at = 7.days.ago
  #     end
  #     # .tap { |user| user.avatar.attach(io: URI.parse(row["avatar"]).open, filename: File.basename(row["avatar"])) }
  #   end

  #   #   CSV.foreach(file.path, headers: true) do |row|
  #   #     users_to_insert << User.new(
  #   #       name: row["name"].presence || "Default Name",
  #   #       # avatar: row["avatar"].presence || "Default Name",
  #   #       avatar: row["avatar"],
  #   #       # surname: row["surname"].presence || "Default Name",
  #   #       # role: row["role"] || "user".presence || "Default Name",
  #   #       # dob: row["dob"].presence || "Default Name",
  #   #       # location: row["location"].presence || "Default Name",
  #   #       # email: row["email"].presence || "default@example.com",
  #   #     )
  #   #   end

  #   User.import(users_to_insert, on_duplicate_key_ignore: true)
  #   #   User.import [users_to_insert], on_duplicate_key_ignore: true
  #   # end
  # end

  def turbo_frame_request?
    request.headers['Turbo-Frame'].present?
  end

  def turbo_frame_request_variant
    request.variant = :turbo_frame if turbo_frame_request?
  end

  def validate_turbo_frame_request
    return if turbo_frame_request?

    # Handle non-Turbo Frame requests, e.g., redirect or render an error page
    redirect_to root_path, alert: 'Invalid request'
  end
end
