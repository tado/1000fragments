uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.37 + vec2(t * 2.52, -t * 1.84) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 3.56 * p.y + time * 1.19); p.y += 0.33 / wf * cos(wf * 3.58 * p.x + time * 0.91); }
	p.y += sin(p.x * 4.59 + time * 1.86) * 0.17;
	{ p = vec2(atan(p.y, p.x) * 2.74, length(p) * 4.60 - time * 0.61); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.18, 0.89, 0.26) * (0.09 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
