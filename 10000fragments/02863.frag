uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.32, t * 1.32 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.38;
	p = rot2(length(p) * 2.62 + time * 0.59) * p;
	{ p = vec2(atan(p.y, p.x) * 2.03, length(p) * 5.64 - time * 0.57); }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.22 / wf * sin(wf * 2.98 * p.y + time * 0.60); p.y += 0.37 / wf * cos(wf * 1.60 * p.x + time * 1.74); }
	p = rot2(time * 1.08) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.97 + time * 0.24, vec3(0.55, 0.57, 0.56), vec3(0.43, 0.38, 0.49), vec3(1.07, 1.11, 1.37), vec3(0.83, 0.21, 0.50));
	col = fract(col * 1.37);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
