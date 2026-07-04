uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
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
    vec2 wq = vec2(vnoise2(p * 4.57 + ph), vnoise2(p * 4.57 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.57 + 3.50 * wq + vec2(1.7, 9.2) + t * 1.14),
                   vnoise2(p * 4.57 + 1.62 * wq + vec2(8.3, 2.8) - t * 0.91));
    v = vnoise2(p * 4.57 + 2.07 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.40) * p * 16.61;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.65;
	float v = smoothstep(rad, rad - 0.14, length(hf));
	vec3 col = palette(d * 0.81 + time * 0.06, vec3(0.52, 0.60, 0.45), vec3(0.40, 0.46, 0.38), vec3(1.36, 1.39, 0.71), vec3(0.25, 0.34, 0.34)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
