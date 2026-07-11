uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.12) - 0.5;
    float rad = 0.24 + 0.12 * sin(t * 2.80 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.47), cos(time * 0.44)) * 0.10;
	float an = atan(p.y, p.x) + time * 0.52;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.05 / 3.1415927, 1.41 / r - time * 1.74);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.77 + time * 0.38, vec3(0.40, 0.43, 0.41), vec3(0.42, 0.46, 0.34), vec3(1.26, 1.06, 0.95), vec3(0.20, 0.87, 0.74));
	col *= clamp(r * 2.59, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
