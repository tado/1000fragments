uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 23.19 + sin(p.y * 4.75 + t * 1.20) * 3.20 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.09, t * 1.10 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.68;
	p = rot2(1.06) * p;
	{ float fr = length(p); p *= 1.0 + 0.47 * fr * fr; }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 3.80 * p.y + time * 1.67); p.y += 0.25 / wf * cos(wf * 2.38 * p.x + time * 0.62); }
	{ p = vec2(atan(p.y, p.x) * 2.83, length(p) * 2.33 - time * 0.41); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.35);
	float d = d1 + d2;
	vec3 col = palette(d * 0.61 + time * 0.24, vec3(0.60, 0.44, 0.52), vec3(0.34, 0.32, 0.33), vec3(0.98, 1.07, 0.87), vec3(0.10, 0.79, 0.00));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
