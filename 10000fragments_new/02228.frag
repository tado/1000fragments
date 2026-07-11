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
    v = sin(p.x * 20.11 + sin(p.y * 4.36 + t * 5.26) * 3.59 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.97 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.16 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 11.49) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.62 + ph), vnoise2(p * 2.62 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.62 + 3.33 * wq + vec2(1.7, 9.2) + t * 0.91),
                   vnoise2(p * 2.62 + 3.55 * wq + vec2(8.3, 2.8) - t * 0.99));
    v = vnoise2(p * 2.62 + 3.89 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.07;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = rot2(2.43) * q2;
	q3 += vec2(0.03, 0.31) * sin(length(q3) * 4.09 - time * 1.68) * 0.18;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.20);
	float d3 = fieldC(q3, time, 0.25);
	d2 = min(d2, d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.70 + time * 0.18);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
