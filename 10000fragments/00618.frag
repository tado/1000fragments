uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 16.45 + sin(p.y * 3.52 + t * 3.89) * 4.55 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.01;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 2.60 * p.y + time * 1.54); p.y += 0.36 / wf * cos(wf * 3.87 * p.x + time * 0.78); }
	{ p = vec2(atan(p.y, p.x) * 1.48, length(p) * 5.62 - time * 0.80); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.27, lr * 1.76 + time * 0.40); }
	p = rot2(p.y * -3.61 + time * 0.46) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.09 + time * 0.04);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
