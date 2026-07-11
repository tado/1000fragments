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
        vec2 lp = vec2(sin(lt * 3.0 + t * 1.39 + ph), sin(lt * 4.0 + t * 1.34)) * 0.77;
        md = min(md, length(p - lp)); }
    v = exp(-md * 9.07) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.33 + 0.34 * pow(abs(cos(ra * 4.0 + t * 1.70)), 2.93);
    v = sin((rr - pet) * 14.17 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.32;
	{ p = vec2(atan(p.y, p.x) * 1.02, length(p) * 2.74 - time * 0.29); }
	p.y += sin(p.x * 6.66 + time * 1.38) * 0.35;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.06);
	float d = d1 + d2;
	vec3 col = palette(d * 1.76 + time * 0.17, vec3(0.55, 0.58, 0.56), vec3(0.47, 0.34, 0.44), vec3(1.40, 0.91, 1.22), vec3(0.76, 0.75, 0.19));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
