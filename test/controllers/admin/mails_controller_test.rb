require "test_helper"

class Admin::MailsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get admin_mails_index_url
    assert_response :success
  end
end
