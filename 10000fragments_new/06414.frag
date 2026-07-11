uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.31 + 0.16 * cos(sa * 4.0 + t * 0.52 + ph);
    v = sin((sr - petal) * 17.24);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.85;
	p = rot2(p.y * -1.73 + time * 0.59) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 2.10 * p.y + time * 1.05); p.y += 0.43 / wf * cos(wf * 3.15 * p.x + time * 0.90); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.39 + time * 0.14, vec3(0.40, 0.59, 0.58), vec3(0.36, 0.50, 0.42), vec3(1.37, 1.39, 1.26), vec3(0.58, 0.91, 0.78));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.94 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
