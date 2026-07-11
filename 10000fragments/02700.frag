uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.63 + 0.16 * cos(sa * 3 + t * 0.72 + ph);
    v = sin((sr - petal) * 13.34);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.23;
	{ p = vec2(atan(p.y, p.x) * 2.32, length(p) * 2.87 - time * 0.49); }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.22 / wf * sin(wf * 2.52 * p.y + time * 1.44); p.y += 0.25 / wf * cos(wf * 3.68 * p.x + time * 1.08); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.39), field(p, time, 2.78));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
