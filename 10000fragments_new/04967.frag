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
    vec2 wq = vec2(vnoise2(p * 4.93 + ph), vnoise2(p * 4.93 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.93 + 3.79 * wq + vec2(1.7, 9.2) + t * 0.85),
                   vnoise2(p * 4.93 + 2.16 * wq + vec2(8.3, 2.8) - t * 1.14));
    v = vnoise2(p * 4.93 + 1.57 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.65 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.22 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 6.78) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.36;
	vec2 q1 = p; vec2 q2 = p;
	q2 = rot2(q2.y * -2.77 + time * 0.41) * q2;
	q2 = abs(q2) - 0.71;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.15);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.64));
	vec3 col = vec3(0.63, 0.77, 0.28) * (0.19 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.99 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
