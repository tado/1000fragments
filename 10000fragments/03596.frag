uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.91 + vec2(t * 2.21, -t * 2.21) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + 0.60 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 1.73, length(p) * 4.75 - time * 0.45); }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 2.40 * p.y + time * 0.66); p.y += 0.32 / wf * cos(wf * 3.28 * p.x + time * 1.06); }
	p = fract(p * 1.18) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.45), field(p, time, 0.90));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
