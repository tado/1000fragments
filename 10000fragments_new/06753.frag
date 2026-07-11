uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 8.0 + qr * 5.15 * sin(t * 1.09) + t * 4.17 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.92 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.23 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 6.73) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.43;
	vec2 q1 = p; vec2 q2 = p;
	q1 = abs(q1);
	{ float fr = length(q1); q1 *= 1.0 + 0.44 * fr * fr; }
	q2 = rot2(time * 0.93) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.13);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.42 + time * 0.26, vec3(0.56, 0.43, 0.56), vec3(0.46, 0.31, 0.47), vec3(0.88, 1.29, 0.86), vec3(0.11, 0.34, 0.93));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
