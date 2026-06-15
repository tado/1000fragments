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
    v = sin(sa * 6.84 + sr * 5.06 - t * 4.61 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.80;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.49 / wf * sin(wf * 2.99 * p.y + time * 1.19); p.y += 0.47 / wf * cos(wf * 3.51 * p.x + time * 1.44); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.07, lr * 1.59 + time * 0.72); }
	p = rot2(time * 0.89) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.84 + time * 0.23, vec3(0.59, 0.44, 0.48), vec3(0.33, 0.39, 0.38), vec3(1.12, 1.04, 1.33), vec3(0.26, 0.77, 0.88));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
