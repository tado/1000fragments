uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.67) - 0.5;
    float rad = 0.43 + 0.12 * sin(t * 3.29 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.62), cos(time * 1.30)) * 0.20;
	float an = atan(p.y, p.x) + time * -0.66;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.32 / 3.1415927, 0.52 / r - time * 2.52);
	tv.x += tv.y * 0.28;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.17 + time * 0.11, vec3(0.49, 0.60, 0.47), vec3(0.43, 0.37, 0.33), vec3(1.32, 0.76, 0.75), vec3(0.82, 0.01, 0.27));
	col *= clamp(r * 2.18, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
