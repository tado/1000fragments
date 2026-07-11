uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.94) - 0.5;
    float rad = 0.31 + 0.12 * sin(t * 1.73 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.73;
	{ float fr = length(p); p *= 1.0 + 0.46 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 2.51, length(p) * 5.81 - time * 0.52); }
	p = fract(p * 2.31) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.33), field(p, time, 2.66));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
