uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 8.0 + qr * 2.42 * sin(t * 0.42) + t * 5.19 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 3.0 + t * 1.36 + ph), sin(lt * 5.0 + t * 0.96)) * 0.90;
        md = min(md, length(p - lp)); }
    v = exp(-md * 4.24) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.55;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.30, lr * 1.25 + time * -0.46); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p.y += sin(p.x * 6.87 + time * 1.87) * 0.16;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.97);
	float d = d1 + d2;
	vec3 col = palette(d * 0.96 + time * 0.28, vec3(0.51, 0.58, 0.44), vec3(0.46, 0.47, 0.49), vec3(0.83, 0.82, 0.89), vec3(0.04, 0.50, 0.91));
	col *= 0.90 + 0.12 * sin(gl_FragCoord.y * 2.28 + time * 7.31);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
