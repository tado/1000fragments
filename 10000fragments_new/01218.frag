uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.85) - 0.5;
    float rad = 0.28 + 0.12 * sin(t * 1.04 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.04), cos(time * 1.33)) * 0.23;
	float an = atan(p.y, p.x) + time * 0.49;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.76 / 3.1415927, 1.05 / r - time * 0.95);
	tv.x += tv.y * 0.48;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.38 + time * 0.09, vec3(0.57, 0.57, 0.41), vec3(0.49, 0.46, 0.35), vec3(1.19, 1.34, 1.29), vec3(0.07, 0.28, 0.09));
	col *= clamp(r * 1.93, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
