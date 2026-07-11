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
    vec2 wq = vec2(vnoise2(p * 3.33 + ph), vnoise2(p * 3.33 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.33 + 2.21 * wq + vec2(1.7, 9.2) + t * 0.31),
                   vnoise2(p * 3.33 + 1.17 * wq + vec2(8.3, 2.8) - t * 0.66));
    v = vnoise2(p * 3.33 + 2.63 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.17;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.10 / 3.1415927, 1.40 / r - time * 2.34);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.56 + time * 0.19, vec3(0.51, 0.44, 0.43), vec3(0.36, 0.46, 0.46), vec3(1.12, 1.18, 0.95), vec3(0.28, 0.36, 0.42));
	col *= clamp(r * 2.63, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
