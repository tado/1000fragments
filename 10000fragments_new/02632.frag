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
    float wa = sin(p.x * 11.87 + t * 3.71 + ph) * 0.7;
    float wb = sin(p.y * 14.39 - t * 3.82 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.35;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 3.21 + ph), vnoise2(p * 3.21 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.21 + 1.42 * wq + vec2(1.7, 9.2) + t * 0.62),
                   vnoise2(p * 3.21 + 1.23 * wq + vec2(8.3, 2.8) - t * 0.97));
    v = vnoise2(p * 3.21 + 2.72 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.34;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.74);
	float d = d1 + d2;
	vec3 col = palette(d * 1.24 + time * 0.08, vec3(0.47, 0.55, 0.48), vec3(0.32, 0.46, 0.48), vec3(1.28, 0.72, 1.15), vec3(0.10, 0.65, 0.63));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
