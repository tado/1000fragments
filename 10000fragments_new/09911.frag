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
        float ang = ff * 2.3999632 + t * 0.76 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.30 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 4.82) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.17;
	p = (floor(p * 14.0) + 0.5) / 14.0;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.10 + time * 0.07, vec3(0.60, 0.56, 0.50), vec3(0.48, 0.41, 0.43), vec3(1.27, 0.79, 0.99), vec3(0.69, 0.12, 0.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
