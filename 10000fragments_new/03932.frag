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
        float ang = ff * 2.3999632 + t * 0.94 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.15 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 11.62) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.45;
	p = (floor(p * 22.4) + 0.5) / 22.4;
	p *= 2.00;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.66 + time * 0.25, vec3(0.56, 0.52, 0.43), vec3(0.42, 0.44, 0.39), vec3(1.11, 1.18, 1.09), vec3(0.24, 0.30, 0.34));
	col = mod(col * 2.79, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
