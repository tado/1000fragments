uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.34) - 0.5;
    float rad = 0.44 + 0.12 * sin(t * 3.27 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.70;
	p = abs(p) - 0.38;
	{ p = vec2(atan(p.y, p.x) * 2.30, length(p) * 5.15 - time * 0.17); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.62), field(p, time, 1.24));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
