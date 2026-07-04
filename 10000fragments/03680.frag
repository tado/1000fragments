uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.55, 0.0)) * 26.49 - t * 2.52 + ph);
    float mb = sin(length(p + vec2(0.55, 0.0)) * 8.95 - t * 5.89 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 2.67) - 0.5;
	p = sin(p * 2.07 + time * 0.58) * 0.89;
	{ p = vec2(atan(p.y, p.x) * 2.69, length(p) * 5.10 - time * 0.95); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.30), field(p, time, 0.60));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
