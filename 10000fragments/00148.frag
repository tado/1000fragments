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
    vec2 wq = vec2(vnoise2(p * 4.01 + ph), vnoise2(p * 4.01 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.01 + 1.15 * wq + vec2(1.7, 9.2) + t * 1.12),
                   vnoise2(p * 4.01 + 1.55 * wq + vec2(8.3, 2.8) - t * 0.49));
    v = vnoise2(p * 4.01 + 1.73 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.78), cos(time * 0.93)) * 0.06;
	float an = atan(p.y, p.x) + time * 0.56;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.61 / 3.1415927, 0.33 / r - time * 0.88);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.43 + time * 0.32, vec3(0.55, 0.46, 0.52), vec3(0.31, 0.30, 0.39), vec3(1.34, 1.14, 0.71), vec3(0.55, 0.91, 0.78));
	col *= clamp(r * 2.04, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
