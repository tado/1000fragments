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
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 1.95 + ph), vnoise2(p * 1.95 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 1.95 + 3.31 * wq + vec2(1.7, 9.2) + t * 0.93),
                   vnoise2(p * 1.95 + 3.47 * wq + vec2(8.3, 2.8) - t * 1.01));
    v = vnoise2(p * 1.95 + 1.41 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.93 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.18 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 10.68) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.11;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * 2.17 + time * 0.36) * q1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.18);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.56));
	vec3 col = hue(d * 0.83 + time * 0.01);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
