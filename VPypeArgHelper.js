function generateSvgArgs(inputFileName, outputFileName, configuration){

    let result = ['read', inputFileName];

    // layout
    const innerSize = {
        x: configuration.canvasSize.x - (configuration.margin * 2),
        y: configuration.canvasSize.y - (configuration.margin * 2)
    }

    result.push(`layout -m ${configuration.margin}mm ${innerSize.x}mmx${innerSize.y}mm`);

    // border
    if (configuration.border) {
        result.push(`rect 0 0 ${innerSize.x}mm ${innerSize.y}mm`);
    }

    // optimization
    result.push(`splitall`);
    result.push(`linemerge --tolerance 0.5mm`);
    result.push(`linesimplify --tolerance 0.1mm`);
    result.push(`filter --min-length 0.5mm`);
    result.push(`linesort`);

    // write svg
    result.push(`write --page-size ${innerSize.x}mmx${innerSize.y}mm ${outputFileName}`);

    return result;
}

function generateGcodeArgs(inputFileName, outputFileName){
    return ['read', inputFileName, 'gwrite', '--profile gcodebb', outputFileName]
}

module.exports = {generateSvgArgs, generateGcodeArgs};


/*
vpype read input.svg \
  layout -w 460mm -h 660mm -m 0mm -v center -h center -s \
  translate 20mm 20mm \
  rect 0 0 500mm 700mm \
  write --page-size 500mmx700mm output.svg

vpype read $in scaleto 50cm 70cm layout 50cmx70cm splitall linemerge --tolerance 0.5mm linesimplify --tolerance 0.1mm filter --min-length 0.5mm linesort write $out
#vpype read $in layout 60cmx70cm splitall linemerge --tolerance 0.5mm linesimplify --tolerance 0.1mm filter --min-length 0.5mm linesort write $out
vpype read $out gwrite --profile gcodebb $gcout

 */