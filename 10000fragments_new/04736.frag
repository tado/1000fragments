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
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 1.29 + ph), sin(lt * 3.0 + t * 0.38)) * 0.97;
        md = min(md, length(p - lp)); }
    v = exp(-md * 9.53) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.48 + 0.25 * pow(abs(cos(ra * 3.0 + t * 2.16)), 2.28);
    v = sin((rr - pet) * 20.08 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.92;
	{ p = vec2(atan(p.y, p.x) * 2.17, length(p) * 2.61 - time * 0.37); }
	p += vec2(0.81, 0.15) * sin(length(p) * 3.93 - time * 2.26) * 0.30;
	p = rot2(time * -0.99) * p;
	p = rot2(p.y * 3.95 + time * 1.10) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.71);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.39 + time * 0.13, vec3(0.55, 0.50, 0.48), vec3(0.45, 0.40, 0.31), vec3(0.71, 1.11, 1.11), vec3(0.19, 0.87, 0.89));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
