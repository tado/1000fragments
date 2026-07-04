uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.42 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.21 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 11.52) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 3.08;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.21 + 0.14 * sin(t * 4.51 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.36;
	vec2 q1 = p; vec2 q2 = p;
	q1 = abs(q1);
	q1 = rot2(q1.y * 3.76 + time * 0.51) * q1;
	q2 = rot2(2.94) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.18);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.87, 0.81, 1.47) + vec3(0.19, 0.24, 0.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
