uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.13;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.78; kp = rot2(0.49) * kp; kp *= 1.19; }
    v = sin(kp.y * 2.95 - t * 2.16 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 22.97 + sin(p.y * 5.88 + t * 4.89) * 2.52 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.74;
	{ float fr = length(p); p *= 1.0 + -0.58 * fr * fr; }
	p = rot2(p.y * 1.30 + time * 1.05) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.37 / wf * sin(wf * 3.20 * p.y + time * 0.87); p.y += 0.24 / wf * cos(wf * 2.81 * p.x + time * 1.42); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.09);
	float d = d1 + d2;
	vec3 col = palette(d * 0.97 + time * 0.18, vec3(0.59, 0.51, 0.46), vec3(0.32, 0.47, 0.34), vec3(1.03, 1.14, 0.75), vec3(0.48, 0.91, 0.19));
	col = mod(col * 1.31, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
