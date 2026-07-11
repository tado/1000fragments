uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.79 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.17 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 5.10) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 1.19) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.95 + time * 0.26, vec3(0.50, 0.60, 0.54), vec3(0.43, 0.42, 0.32), vec3(1.30, 0.88, 0.81), vec3(0.54, 0.42, 0.40));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
