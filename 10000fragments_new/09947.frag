uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.93 + ph), sin(lt * 2.0 + t * 0.47)) * 0.68;
        md = min(md, length(p - lp)); }
    v = exp(-md * 8.95) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.48 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.24 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 10.57) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.66;
	p.x += sin(p.y * 6.85 + time * 1.53) * 0.14;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.90);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.11 + time * 0.17, vec3(0.42, 0.47, 0.42), vec3(0.34, 0.49, 0.36), vec3(0.91, 0.80, 1.05), vec3(0.67, 0.11, 0.09));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
