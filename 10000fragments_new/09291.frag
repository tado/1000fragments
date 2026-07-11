uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.09;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.54; kp = rot2(2.05) * kp; kp *= 1.19; }
    v = sin(kp.x * 2.48 - t * 2.53 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.36;
	p = rot2(time * 0.94) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.59, lr * 1.01 + time * 0.24); }
	p += vec2(0.36, -0.99) * sin(length(p) * 3.22 - time * 2.34) * 0.15;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.29 / wf * sin(wf * 2.69 * p.y + time * 1.63); p.y += 0.32 / wf * cos(wf * 3.75 * p.x + time * 0.62); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.70 + time * 0.12);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
