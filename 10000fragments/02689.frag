uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 20.98 + sin(p.y * 3.16 + t * 4.94) * 2.46 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.52 + 0.26 * cos(sa * 3 + t * 2.52 + ph);
    v = sin((sr - petal) * 15.81);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.25;
	p = rot2(length(p) * 3.35 + time * 0.60) * p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 3.78 * p.y + time * 1.18); p.y += 0.27 / wf * cos(wf * 2.73 * p.x + time * 0.91); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.46);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.24 + time * 0.05, vec3(0.41, 0.42, 0.59), vec3(0.37, 0.31, 0.39), vec3(1.05, 0.89, 0.96), vec3(0.07, 0.67, 0.43));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.88));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
