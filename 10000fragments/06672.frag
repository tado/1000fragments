uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.13, t * 1.15 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.40;
	p = rot2(p.y * -3.19 + time * 0.78) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.94, lr * 1.28 + time * -0.73); }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 2.41 * p.y + time * 1.33); p.y += 0.47 / wf * cos(wf * 3.54 * p.x + time * 1.44); }
	{ float fr = length(p); p *= 1.0 + -0.53 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.57 + time * 0.01);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
