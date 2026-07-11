uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.38 + 0.25 * cos(sa * 6 + t * 2.32 + ph);
    v = sin((sr - petal) * 16.65);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p);
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.30 / wf * sin(wf * 2.39 * p.y + time * 0.96); p.y += 0.25 / wf * cos(wf * 1.84 * p.x + time * 1.66); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.38), field(p, time, 0.75));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
