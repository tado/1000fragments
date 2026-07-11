uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.94 + t * 1.30 + ph) + sin(p.y * 2.91 - t * 1.30 + ph)
        + sin((p.x + p.y) * 5.79 + t * 1.30 + ph) + sin(length(p) * 9.52 - t * 1.30 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.43 / wf * sin(wf * 3.62 * p.y + time * 1.49); p.y += 0.20 / wf * cos(wf * 3.84 * p.x + time * 0.83); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.46, lr * 1.09 + time * 0.26); }
	p = rot2(p.y * -3.75 + time * 0.43) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.90 + time * 0.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
