uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.94) - 0.5;
    float rad = 0.31 + 0.12 * sin(t * 3.37 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.48), cos(time * 1.14)) * 0.23;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.22 / 3.1415927, 0.39 / r - time * 1.45);
	tv.x += tv.y * 0.24;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.07, 0.63, 1.30) + vec3(0.07, 0.20, 0.13);
	col *= clamp(r * 2.97, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.46 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
