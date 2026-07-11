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
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 10.0 + qr * 7.46 * sin(t * 1.11) + t * 4.22 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 3.90 + ph), vnoise2(p * 3.90 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.90 + 3.23 * wq + vec2(1.7, 9.2) + t * 0.87),
                   vnoise2(p * 3.90 + 2.17 * wq + vec2(8.3, 2.8) - t * 0.34));
    v = vnoise2(p * 3.90 + 1.49 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = abs(p) - 0.77;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.56);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.61 + time * 0.30, vec3(0.44, 0.47, 0.46), vec3(0.45, 0.34, 0.48), vec3(1.36, 1.00, 1.26), vec3(0.92, 0.31, 0.95));
	col = clamp((col - 0.5) * 1.92 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
