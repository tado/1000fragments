uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.40 + vec2(t * 1.39, -t * 1.39) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.28 / wf * sin(wf * 2.66 * p.y + time * 0.94); p.y += 0.40 / wf * cos(wf * 3.39 * p.x + time * 1.14); }
	p = rot2(length(p) * 1.57 + time * 0.43) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.12), field(p, time, 2.24));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.62, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
