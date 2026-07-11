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
    v = 0.5 * sin(length(p) * 14.95 - t * 4.67 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 3.31 + ph), vnoise2(p * 3.31 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.31 + 1.44 * wq + vec2(1.7, 9.2) + t * 0.92),
                   vnoise2(p * 3.31 + 1.83 * wq + vec2(8.3, 2.8) - t * 0.50));
    v = vnoise2(p * 3.31 + 1.69 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.61;
	{ float fr = length(p); p *= 1.0 + 0.76 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.01);
	float d = d1 + d2;
	vec3 col = palette(d * 0.83 + time * 0.26, vec3(0.58, 0.59, 0.51), vec3(0.42, 0.46, 0.33), vec3(0.85, 1.08, 0.92), vec3(0.74, 0.13, 0.14));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
