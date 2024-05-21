class Admin::DashboardsController < ApplicationController
  def index
    # Admin index
  end

  def show
    # Student list goes here...
    @dashboard_data = Admin::DashboardsPresenter.analytics_data
  end

  def verify_students
    # Verify students email
  end

  def bulk_import
    # Bulk import CSV data
  end

  def admin_mail
    # Admin mail messages
  end
end
