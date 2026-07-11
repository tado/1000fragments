uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.52 + 0.14 * cos(sa * 8 + t * 0.60 + ph);
    v = sin((sr - petal) * 13.02);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.66;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.35 / wf * sin(wf * 2.74 * p.y + time * 1.11); p.y += 0.40 / wf * cos(wf * 1.93 * p.x + time * 1.46); }
	p += vec2(0.42, 0.72) * sin(length(p) * 2.93 - time * 1.62) * 0.37;
	{ float fr = length(p); p *= 1.0 + -0.39 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.37), field(p, time, 0.74));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
