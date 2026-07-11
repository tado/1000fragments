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
    vec2 wq = vec2(vnoise2(p * 2.93 + ph), vnoise2(p * 2.93 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.93 + 3.33 * wq + vec2(1.7, 9.2) + t * 0.53),
                   vnoise2(p * 2.93 + 3.74 * wq + vec2(8.3, 2.8) - t * 0.60));
    v = vnoise2(p * 2.93 + 2.17 * wr) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 20.85);
    float gsh = hash21(vec2(grow, floor(t * 8.63))) - 0.5;
    float gx = p.x + gsh * 0.76;
    v = sin(gx * 16.06 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.41));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(p.y * 3.19 + time * 0.57) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.69);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.12 + time * 0.30, vec3(0.52, 0.55, 0.46), vec3(0.44, 0.34, 0.49), vec3(0.79, 0.96, 0.89), vec3(0.47, 0.68, 0.53));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
