uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.40 + 0.25 * cos(sa * 9.0 + t * 1.35 + ph);
    v = sin((sr - petal) * 11.26);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.21;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 2.50 * p.y + time * 1.77); p.y += 0.24 / wf * cos(wf * 2.24 * p.x + time * 0.68); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(p.y * -1.69 + time * 1.14) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.66 + time * 0.29);
	col = mod(col * 2.75, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
