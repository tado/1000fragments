uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.50 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.30 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 10.52) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.87 + sr * 8.93 - t * 1.44 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.68;
	p = fract(p * 2.42) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.14);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.31 + time * 0.02, vec3(0.52, 0.46, 0.56), vec3(0.35, 0.31, 0.35), vec3(1.31, 0.82, 1.23), vec3(0.29, 0.93, 0.00));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
