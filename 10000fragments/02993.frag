uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 8.91 + vec2(t * 0.91, -t * 0.91) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.60;
	p = rot2(length(p) * 1.72 + time * 0.76) * p;
	p = rot2(time * 0.65) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.20 / wf * sin(wf * 3.46 * p.y + time * 1.58); p.y += 0.31 / wf * cos(wf * 3.08 * p.x + time * 1.58); }
	{ p = vec2(atan(p.y, p.x) * 2.83, length(p) * 2.34 - time * 0.70); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.55 + time * 0.21);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.85));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
