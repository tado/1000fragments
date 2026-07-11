uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.46 + 0.34 * pow(abs(cos(ra * 4.0 + t * 0.88)), 2.62);
    v = sin((rr - pet) * 8.65 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.80;
	p = rot2(length(p) * 3.81 + time * 0.59) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 2.89 * p.y + time * 1.42); p.y += 0.49 / wf * cos(wf * 3.93 * p.x + time * 1.20); }
	{ float fr = length(p); p *= 1.0 + -0.79 * fr * fr; }
	p = (floor(p * 18.7) + 0.5) / 18.7;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.31 + time * 0.24, vec3(0.48, 0.42, 0.54), vec3(0.30, 0.50, 0.34), vec3(1.28, 0.86, 1.39), vec3(0.05, 0.46, 0.23));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.41 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
