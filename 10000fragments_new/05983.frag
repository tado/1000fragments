uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.37;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.46; kp = rot2(1.78) * kp; kp *= 1.20; }
    v = sin(kp.x * 2.64 - t * 3.74 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 5.0 + t * 1.24 + ph), sin(lt * 5.0 + t * 1.33)) * 0.60;
        md = min(md, length(p - lp)); }
    v = exp(-md * 3.43) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.87;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * 1.10 + time * 0.34) * q1;
	{ float fr = length(q1); q1 *= 1.0 + 0.61 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.34);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.89, 0.81, 0.92) * (0.17 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.92 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
