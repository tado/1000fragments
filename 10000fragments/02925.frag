uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.07 + vec2(t * 1.93, -t * 1.93) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = abs(p) - 0.61;
	{ float fr = length(p); p *= 1.0 + -0.57 * fr * fr; }
	p = rot2(length(p) * -2.94 + time * 0.74) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 2.61 * p.y + time * 0.94); p.y += 0.39 / wf * cos(wf * 3.11 * p.x + time * 0.73); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.62 + time * 0.06);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
