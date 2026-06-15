uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.35 + 0.27 * cos(sa * 7 + t * 0.33 + ph);
    v = sin((sr - petal) * 17.17);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.82;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.31; p = rot2(1.70) * p; }
	p = fract(p * 2.21) - 0.5;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.36 / wf * sin(wf * 2.65 * p.y + time * 1.77); p.y += 0.23 / wf * cos(wf * 1.97 * p.x + time * 1.80); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.23, lr * 2.33 + time * 0.80); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.11, 0.23, 0.23), vec3(0.72, 0.90, 0.87), d);
	col = fract(col * 1.45);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
