uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 13.60 + sin(p.y * 3.71 + t * 4.24) * 2.11 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.50;
	{ float fr = length(p); p *= 1.0 + 0.79 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.27, lr * 1.05 + time * -0.79); }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.35 / wf * sin(wf * 2.09 * p.y + time * 0.65); p.y += 0.28 / wf * cos(wf * 2.86 * p.x + time * 0.65); }
	p += vec2(-0.70, -0.30) * sin(length(p) * 2.32 - time * 1.11) * 0.20;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.88 + time * 0.22);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.50));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
