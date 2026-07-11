uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.52 + 0.12 * cos(sa * 7 + t * 2.10 + ph);
    v = sin((sr - petal) * 19.56);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.45 / wf * sin(wf * 1.58 * p.y + time * 1.96); p.y += 0.32 / wf * cos(wf * 3.30 * p.x + time * 1.14); }
	p += vec2(-0.69, 0.05) * sin(length(p) * 2.52 - time * 1.79) * 0.39;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.91), field(p, time, 1.81));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
