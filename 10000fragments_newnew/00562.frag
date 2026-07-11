uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.34, 0.0)) * 21.52 - t * 5.14 + ph);
    float mb = sin(length(p + vec2(0.34, 0.0)) * 38.15 - t * 6.41 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += sin(p.y * 6.81 + time * 3.55) * 0.13;
	p = fract(p * 2.32) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 1.51, length(p) * 3.46 - time * 0.60); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.79), field(p, time, 1.58));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
