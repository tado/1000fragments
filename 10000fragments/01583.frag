uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.29, 0.0)) * 8.70 - t * 6.55 + ph);
    float mb = sin(length(p + vec2(0.29, 0.0)) * 27.86 - t * 6.55 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.24;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.05, lr * 2.06 + time * -0.64); }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.44 / wf * sin(wf * 1.68 * p.y + time * 0.82); p.y += 0.37 / wf * cos(wf * 2.27 * p.x + time * 1.09); }
	p += vec2(0.78, 0.91) * sin(length(p) * 5.81 - time * 0.51) * 0.19;
	p = fract(p * 1.36) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.50 + time * 0.15);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
