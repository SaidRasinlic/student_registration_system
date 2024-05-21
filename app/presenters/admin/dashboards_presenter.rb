# app/presenters/admin/dashboards_presenter.rb
class Admin::DashboardsPresenter
  def self.analytics_data
    data =
      {
        total_registered_students: User.where(role: :student).count,
        today_registered_students: User.where(role: 'student').where(created_at: (Time.now - 24.hours)..Time.now).count,
        total_unpaid_bills: 24_298,
        total_paid_bills: 24_298,
        male_students: 3422,
        female_students: 2464
        # ... (other data)
      }
    # Use keys of the data hash as the attribute names for the Struct object by converting keys to the array of symbols
    attribute_names = data.keys.map(&:to_sym)
    Struct.new(*attribute_names).new(*data.values_at(*attribute_names))
  end
end
