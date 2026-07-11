uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 1.06 + ph), sin(lt * 4.0 + t * 0.63)) * 0.81;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.47) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 3.84 - t * 0.67;
    v = sin(floor(lv * 4.7) / 4.7 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p += vec2(sin((time * 0.80) * 1.13), cos((time * 0.80) * 1.12)) * 0.09;
	p.x *= resolution.x / resolution.y;
	p *= 0.99;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.03, lr * 2.38 + (time * 0.80) * -0.65); }
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.50; }
	float d1 = field(p, (time * 0.80), 0.0);
	float d2 = field2(p, (time * 0.80), 0.48);
	float d = d1 * d2;
	vec3 col = palette(d * 0.90 + (time * 0.80) * 0.12, vec3(0.22, 0.29, 0.21), vec3(0.23, 0.23, 0.16), vec3(0.56, 0.78, 0.90), vec3(0.52, 0.77, 0.19));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.95));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.18);
	col = clamp(col, 0.0, 1.0) * vec3(1.014, 1.014, 1.001) * 1.00 + 0.034;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
