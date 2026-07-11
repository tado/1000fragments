uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.25 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.22 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 11.72) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 17.85 + t * 1.77 + ph) * 0.7;
    float wb = sin(p.y * 4.83 - t * 3.66 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.56;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.88;
	p *= 1.36;
	p.x += sin(p.y * 4.65 + time * 2.03) * 0.31;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.94);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.62 + time * 0.07, vec3(0.53, 0.56, 0.46), vec3(0.47, 0.34, 0.43), vec3(0.88, 0.96, 0.81), vec3(0.75, 0.94, 0.28));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.08;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
