uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.50 + 0.13 * cos(sa * 8 + t * 1.76 + ph);
    v = sin((sr - petal) * 13.77);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.20;
	p += vec2(-0.29, 0.45) * sin(length(p) * 2.42 - time * 0.50) * 0.30;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 2.69 * p.y + time * 1.40); p.y += 0.45 / wf * cos(wf * 3.30 * p.x + time * 0.61); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.51), field(p, time, 1.01));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.34));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
