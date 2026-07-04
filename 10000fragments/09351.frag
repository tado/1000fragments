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
    float wr = length(p) + 0.19 * vnoise2(p * 4.21 + t * 1.22);
    v = sin(wr * 13.18 - t * 3.14 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.27 / 3.1415927, 1.07 / r - time * 2.91);
	tv.x += tv.y * 0.42;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.08 + time * 0.15, vec3(0.56, 0.49, 0.56), vec3(0.35, 0.31, 0.40), vec3(0.81, 1.21, 1.10), vec3(0.49, 0.94, 0.40));
	col *= clamp(r * 1.09, 0.0, 1.0);
	col *= 0.85 + 0.16 * sin(gl_FragCoord.y * 2.80 + time * 5.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
