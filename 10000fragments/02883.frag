uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.46 + vec2(t * 2.91, -t * 2.91) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.34;
	p = rot2(p.y * -3.33 + time * 0.63) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.27 / wf * sin(wf * 4.00 * p.y + time * 1.32); p.y += 0.21 / wf * cos(wf * 1.56 * p.x + time * 0.78); }
	p = rot2(time * 0.60) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.93 + time * 0.14);
	col = mod(col * 2.69, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
