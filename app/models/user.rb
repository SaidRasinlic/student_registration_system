class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  # devise :database_authenticatable, :registerable,
  #        :recoverable, :rememberable, :validatable
  attr_accessor :current_admin

  # devise :password_expirable, :password_archivable

  devise :database_authenticatable, :registerable, :trackable,
         :recoverable, :rememberable, :validatable, :password_expirable, :password_archivable

  # devise :password_expirable, :secure_validatable, :password_archivable, :session_limitable, :expirable

  has_one_attached :avatar

  validates :full_name, presence: true
  validates :email, presence: true, uniqueness: true
  enum :role, { student: 'student', admin: 'admin' }, validate: true

  before_validation :password, on: :create, if: :created_by_admin?

  # enum role: [:admin, :user], validate: true
  # enum role: { user: 'user', admin: 'admin' }, validate: true
  # enum role: %i[user admin], validate: true
  # enum role: { user: 'user', admin: 'admin' }, validate: true
  # enum :role, %i[user admin], validate: true

  # enum role: {
  #   user: :user,
  #   admin: :admin
  # }

  # enum status: %i[active inactive deleted], validate: { allow_nil: true }

  # enum role: { user: 'user', admin: 'admin' }
  # validates :role, inclusion: { in: roles.keys }

  def is?(requested_role)
    role == requested_role.to_s
  end

  private

  def set_password
    self.password = 'Password' if password.blank?
  end

  def created_by_admin?
    # Implement logic to check if the current user is an admin creating the user
    # This might involve checking a session variable, current_user helper, or other means
    # Example (assuming Devise and a helper method current_user):
    current_admin&.admin?
    # current_user&.admin?
  end
end
