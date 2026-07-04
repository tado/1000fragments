uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wr = length(p) + 0.11 * vnoise2(p * 5.58 + t * 0.83);
    v = sin(wr * 16.01 - t * 0.57 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.78), cos(time * 0.95)) * 0.17;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.47 / 3.1415927, 1.39 / r + time * 0.57);
	tv.x += tv.y * 0.19;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.46 + time * 0.20, vec3(0.53, 0.59, 0.49), vec3(0.43, 0.41, 0.43), vec3(1.11, 1.37, 0.73), vec3(0.85, 0.58, 0.62));
	col *= clamp(r * 1.49, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.16 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
