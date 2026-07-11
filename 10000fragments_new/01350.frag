uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.95) - 0.5;
    float rad = 0.44 + 0.12 * sin(t * 0.85 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.66), cos(time * 1.28)) * 0.15;
	float an = atan(p.y, p.x) + time * -0.41;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.50 / 3.1415927, 1.23 / r - time * 2.39);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.82 + time * 0.32, vec3(0.58, 0.43, 0.44), vec3(0.49, 0.39, 0.42), vec3(0.99, 1.30, 0.78), vec3(0.05, 0.43, 0.24));
	col *= clamp(r * 2.42, 0.0, 1.0);
	col = fract(col * 1.50);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
