# A sample Guardfile
# More info at https://github.com/guard/guard#readme

guard :jammit, :output_folder => 'static', :public_root => '/home/carl/Projects/Humble/humblesoftware.com/' do
  watch('config/assets.yml')
  watch(%r{js/.+\.js})
  watch(%r{css/.+\.css})
  watch(%r{lib/.+\.(js|css)})
  watch(%r{static/lib/.+\.(js|css)})
end

guard :jammit, :output_folder => 'static', :public_root => '/home/carl/Projects/Humble/humblesoftware.com/', :config_path => 'config/unminified-assets.yml' do
  watch('config/uniminified-assets.yml')
  watch(%r{js/.+\.js})
  watch(%r{css/.+\.css})
  watch(%r{lib/.+\.(js|css)})
  watch(%r{static/lib/.+\.(js|css)})
end
