uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 18.77 + t * 2.93 + ph) * 0.7;
    float wb = sin(p.y * 8.22 - t * 0.66 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.70;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.33;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 3.45 * p.y + time * 0.96); p.y += 0.21 / wf * cos(wf * 3.73 * p.x + time * 1.64); }
	p = (floor(p * 25.8) + 0.5) / 25.8;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.10, lr * 1.34 + time * -0.83); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.73 + time * 0.06);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
