uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.34 + 0.22 * cos(sa * 9.0 + t * 0.51 + ph);
    v = sin((sr - petal) * 6.56);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 5.0 + t * 0.33 + ph), sin(lt * 5.0 + t * 1.12)) * 0.51;
        md = min(md, length(p - lp)); }
    v = exp(-md * 8.62) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.57;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p *= 1.0 + 0.19 * sin(time * 3.84);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.24, lr * 1.93 + time * 0.93); }
	{ float fr = length(p); p *= 1.0 + -0.78 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.86);
	float d = d1 + d2;
	vec3 col = palette(d * 1.64 + time * 0.04, vec3(0.44, 0.47, 0.57), vec3(0.39, 0.49, 0.33), vec3(1.39, 0.93, 1.23), vec3(0.11, 0.50, 0.60));
	col = clamp((col - 0.5) * 1.60 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
