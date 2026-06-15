uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.44 + 0.10 * cos(sa * 8 + t * 2.26 + ph);
    v = sin((sr - petal) * 16.69);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.07;
	p += vec2(-0.07, 0.34) * sin(length(p) * 3.38 - time * 1.22) * 0.27;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.47 / wf * sin(wf * 3.56 * p.y + time * 0.81); p.y += 0.46 / wf * cos(wf * 2.25 * p.x + time * 1.49); }
	p = abs(p) - 0.57;
	{ p = vec2(atan(p.y, p.x) * 1.41, length(p) * 2.58 - time * 0.70); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.53, 0.71, 1.06) + vec3(0.18, 0.10, 0.07);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
