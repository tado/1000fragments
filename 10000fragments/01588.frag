uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.63 + 0.24 * cos(sa * 4 + t * 2.42 + ph);
    v = sin((sr - petal) * 15.88);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.85;
	p = rot2(length(p) * -1.79 + time * 0.95) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.37 / wf * sin(wf * 3.16 * p.y + time * 1.82); p.y += 0.30 / wf * cos(wf * 3.91 * p.x + time * 1.10); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.86, 0.98, 0.54) + vec3(0.02, 0.09, 0.03);
	col = mod(col * 2.22, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
