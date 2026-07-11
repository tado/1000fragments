uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.52 + 0.16 * cos(sa * 7.0 + t * 1.51 + ph);
    v = sin((sr - petal) * 19.77);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.18;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.23 / wf * sin(wf * 1.71 * p.y + time * 0.61); p.y += 0.35 / wf * cos(wf * 3.70 * p.x + time * 1.21); }
	p = rot2(length(p) * 1.68 + time * 1.05) * p;
	p = fract(p * 1.24) - 0.5;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.25, 0.09, 0.04), vec3(0.86, 0.65, 0.99), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
