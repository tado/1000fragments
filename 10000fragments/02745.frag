uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.44 + 0.17 * cos(sa * 6 + t * 1.48 + ph);
    v = sin((sr - petal) * 13.38);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.06;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.47 / wf * sin(wf * 3.76 * p.y + time * 0.88); p.y += 0.25 / wf * cos(wf * 2.52 * p.x + time * 0.85); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.17), field(p, time, 2.34));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.94, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
