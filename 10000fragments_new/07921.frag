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
        float ang = ff * 2.3999632 + t * 0.63 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.14 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 10.81) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 1.99, length(p) * 5.60 - time * 0.89); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.63 + time * 0.24, vec3(0.59, 0.43, 0.50), vec3(0.47, 0.42, 0.41), vec3(1.03, 0.78, 0.76), vec3(0.55, 0.81, 0.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
