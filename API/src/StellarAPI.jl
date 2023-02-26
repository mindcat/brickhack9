module StellarAPI

using Oxygen
using HTTP
using StructTypes

include("Stars.jl")

StructTypes.StructType(::Type{Stars.Star}) = StructTypes.Struct()

# All the stars in a vector
stars = Stars.read_data("$(@__DIR__)/data/stars.csv")

function star_type(star)
    type = 12
    if star.spectrum == 'M'
        type = 13
    elseif star.spectrum == 'K'
        type = 14
    elseif star.spectrum == 'G'
        type = 15
    elseif star.spectrum == 'F'
        type = 16
    elseif star.spectrum == 'A'
        type = 17
    elseif star.spectrum == 'B'
        type = 18
    elseif star.spectrum == 'O'
        type = 19
    else 
        type = 13
end

tup_stars = []
for star in stars 
    push!(tup_stars, (star.ra, star.dec, star.mag, star_type(star)))
end

@post "/stars" function(req::HTTP.Request)
    return stars
end

# start the web server
serve()

end # end module