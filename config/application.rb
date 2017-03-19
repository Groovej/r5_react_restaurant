require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ORRestaurants
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    
    # for building modules dependency for export JS assets
    Rails.application.config.assets.configure do |env|
      env.register_transformer 'text/ecmascript-6', 'application/javascript', Sprockets::ES6.new('modules' => 'system', 'moduleIds' => true)
    end
  end
end
