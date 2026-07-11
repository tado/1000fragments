uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.52, 0.0)) * 11.87 - t * 7.05 + ph);
    float mb = sin(length(p + vec2(0.52, 0.0)) * 12.40 - t * 7.05 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 1.25) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.44), field(p, time, 0.87));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.83));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
