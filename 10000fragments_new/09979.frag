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

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 3.08 + ph), vnoise2(p * 3.08 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.08 + 1.48 * wq + vec2(1.7, 9.2) + t * 0.96),
                   vnoise2(p * 3.08 + 1.87 * wq + vec2(8.3, 2.8) - t * 0.45));
    v = vnoise2(p * 3.08 + 1.60 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.72 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.16 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 7.21) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1.y += sin(q1.x * 6.00 + time * 1.66) * 0.16;
	q1 = rot2(length(q1) * 2.27 + time * 1.11) * q1;
	q2 = rot2(q2.y * 3.87 + time * 0.70) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.78);
	float d = min(d1, d2);
	vec3 col = vec3(0.47, 0.73, 0.71) * (0.18 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
