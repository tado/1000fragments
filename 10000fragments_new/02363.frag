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
        float ang = ff * 2.3999632 + t * 0.33 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.13 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 5.26) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 21.19 - t * 7.16 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.77;
	p = (floor(p * 9.0) + 0.5) / 9.0;
	p = abs(p);
	p *= 1.61;
	p.x += sin(p.y * 2.85 + time * 2.62) * 0.29;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.75);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.76 + time * 0.00, vec3(0.56, 0.53, 0.55), vec3(0.31, 0.45, 0.37), vec3(1.11, 1.24, 1.37), vec3(0.88, 0.89, 0.01));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
