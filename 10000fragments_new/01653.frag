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

float fieldA(vec2 p, float t, float ph){
    float v;
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 5.51 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 1.16); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.85 + ph), vnoise2(p * 4.85 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.85 + 1.42 * wq + vec2(1.7, 9.2) + t * 0.46),
                   vnoise2(p * 4.85 + 3.46 * wq + vec2(8.3, 2.8) - t * 0.39));
    v = vnoise2(p * 4.85 + 2.07 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.02;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * -1.18 + time * 0.79) * q1;
	q1.y += sin(q1.x * 7.63 + time * 1.07) * 0.13;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.35);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.24 + time * 0.36, vec3(0.47, 0.43, 0.42), vec3(0.30, 0.44, 0.31), vec3(0.97, 1.26, 0.86), vec3(0.16, 0.54, 0.59));
	col *= 0.86 + 0.16 * sin(gl_FragCoord.y * 2.55 + time * 6.45);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
