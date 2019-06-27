module NoDb
  class Token < NoDb::Base
    include NoDb::Concerns::ExpirationUpdatable
  end
end