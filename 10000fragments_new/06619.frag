uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 24.18 + sin(p.y * 5.97 + t * 1.35) * 4.66 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.68;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.59; kp = rot2(1.15) * kp; kp *= 1.17; }
    v = sin(kp.y * 2.60 - t * 3.70 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.43;
	{ p = vec2(atan(p.y, p.x) * 1.44, length(p) * 4.46 - time * 0.83); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.06, lr * 1.59 + time * -0.40); }
	p.y += sin(p.x * 6.90 + time * 3.43) * 0.24;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.45);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.50 + time * 0.18, vec3(0.46, 0.50, 0.42), vec3(0.41, 0.48, 0.33), vec3(1.15, 1.16, 1.10), vec3(0.51, 0.72, 0.00));
	col = fract(col * 1.40);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
