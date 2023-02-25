module StellarAPI

using Oxygen
using HTTP

@get "/" function(req::HTTP.Request)
    return "home"
end

@get "/greet" function(req::HTTP.Request)
    return "hello world!"
end

# start the web server
serve()

end # end module