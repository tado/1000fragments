uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.99 + t * 2.78 + ph) + sin(p.y * 11.41 - t * 5.13 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.92;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.43 / wf * sin(wf * 1.60 * p.y + time * 1.57); p.y += 0.35 / wf * cos(wf * 3.13 * p.x + time * 1.40); }
	p = rot2(time * 0.42) * p;
	{ float fr = length(p); p *= 1.0 + 0.59 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.17, lr * 2.50 + time * -0.40); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.62 + time * 0.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
