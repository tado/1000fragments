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
    vec2 wq = vec2(vnoise2(p * 3.11 + ph), vnoise2(p * 3.11 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.11 + 3.78 * wq + vec2(1.7, 9.2) + t * 1.01),
                   vnoise2(p * 3.11 + 2.29 * wq + vec2(8.3, 2.8) - t * 0.92));
    v = vnoise2(p * 3.11 + 2.49 * wr) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 7.96;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.23 + 0.08 * sin(t * 2.60 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * -1.44) * p;
	p = rot2(2.71) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.52);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.57 + time * 0.05, vec3(0.42, 0.48, 0.48), vec3(0.49, 0.45, 0.37), vec3(1.40, 0.94, 1.33), vec3(0.36, 0.85, 0.07));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.78 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
