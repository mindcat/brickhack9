module Stars
using CSV, DataFrames

struct Star
    id :: Int64
    properName :: String
    ra :: Float64
    dec :: Float64
    distance :: Float64  # in parsecs, 1 parsec = 3.262 light years
    mag :: Float32
    absmag :: Float32
    spectrum :: Char
end

function read_data(filename)
    stars = CSV.read(filename, DataFrames.DataFrame)
    ret = []
    for row in eachrow(stars)
        # handle missing proper names
        if isequal(row.ProperName, missing) || row.ProperName == " "
            row.ProperName = ""
        end
        # skip ones that have empty spectrum
        if row.Spectrum[1] == ' '
            continue
        end
        push!(ret, Star(row.StarID, 
        row.ProperName, 
        row.RA, 
        row.Dec, 
        row.Distance, 
        row.Mag, 
        row.AbsMag, 
        row.Spectrum[1]))
    end
    return ret
end

end # end module