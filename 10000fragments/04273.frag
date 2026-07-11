uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.35, 0.0)) * 35.92 - t * 4.74 + ph);
    float mb = sin(length(p + vec2(0.35, 0.0)) * 30.23 - t * 4.74 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 2.68, length(p) * 2.73 - time * 0.60); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.08), field(p, time, 2.16));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
