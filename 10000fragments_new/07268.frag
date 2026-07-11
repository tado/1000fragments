uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.26, 0.0)) * 11.81 - t * 4.45 + ph);
    float mb = sin(length(p + vec2(0.26, 0.0)) * 10.27 - t * 7.58 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 0.74 + ph), sin(lt * 4.0 + t * 1.42)) * 0.80;
        md = min(md, length(p - lp)); }
    v = exp(-md * 7.16) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(length(p) * -1.96 + time * 1.26) * p;
	{ p = vec2(atan(p.y, p.x) * 1.03, length(p) * 3.98 - time * 0.68); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.91);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.27 + time * 0.25, vec3(0.59, 0.54, 0.51), vec3(0.31, 0.43, 0.39), vec3(0.96, 1.36, 1.35), vec3(0.29, 0.87, 0.71));
	col = fract(col * 2.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
