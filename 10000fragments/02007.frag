uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.59 + t * 2.59 + ph) + sin(p.y * 3.04 - t * 4.53 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 14.85 - t * 2.50 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * -0.66) * p;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.30 / wf * sin(wf * 2.50 * p.y + time * 0.90); p.y += 0.33 / wf * cos(wf * 2.90 * p.x + time * 1.86); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.36, lr * 1.45 + time * -0.47); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.07);
	float d = d1 * d2;
	vec3 col = palette(d * 0.69 + time * 0.06, vec3(0.49, 0.40, 0.54), vec3(0.37, 0.42, 0.48), vec3(1.36, 1.02, 1.25), vec3(0.06, 0.97, 0.90));
	col = mod(col * 1.42, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
