uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.57 + t * 3.64 + ph) + sin(p.y * 11.66 - t * 3.64 + ph)
        + sin((p.x + p.y) * 3.82 + t * 3.64 + ph) + sin(length(p) * 7.65 - t * 3.64 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.53;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 3.46 * p.y + time * 1.69); p.y += 0.43 / wf * cos(wf * 2.05 * p.x + time * 1.83); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.27, lr * 2.21 + time * -0.75); }
	p += vec2(0.79, 0.48) * sin(length(p) * 5.66 - time * 1.04) * 0.28;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.81 + time * 0.19);
	col = fract(col * 1.63);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
