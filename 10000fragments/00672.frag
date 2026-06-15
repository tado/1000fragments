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
    float petal = 0.69 + 0.17 * cos(sa * 7 + t * 2.69 + ph);
    v = sin((sr - petal) * 18.64);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.59;
	p = rot2(length(p) * 3.88 + time * 0.54) * p;
	p = rot2(time * 0.82) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.35 / wf * sin(wf * 3.22 * p.y + time * 0.75); p.y += 0.41 / wf * cos(wf * 3.47 * p.x + time * 1.65); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.54 + time * 0.24, vec3(0.50, 0.60, 0.47), vec3(0.37, 0.36, 0.38), vec3(1.11, 0.88, 0.85), vec3(0.97, 0.86, 0.07));
	col = clamp((col - 0.5) * 1.35 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
