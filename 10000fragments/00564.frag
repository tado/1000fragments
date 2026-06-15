uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.96 + t * 3.88 + ph) + sin(p.y * 14.93 - t * 5.54 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.87;
	{ p = vec2(atan(p.y, p.x) * 2.06, length(p) * 2.93 - time * 0.18); }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 3.92 * p.y + time * 0.86); p.y += 0.38 / wf * cos(wf * 3.61 * p.x + time * 0.66); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.34, lr * 2.09 + time * 0.79); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.64 + time * 0.26);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.72));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
