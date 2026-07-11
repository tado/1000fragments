uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.69, t * 2.16 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.30 / wf * sin(wf * 3.38 * p.y + time * 1.94); p.y += 0.31 / wf * cos(wf * 2.75 * p.x + time * 1.66); }
	p = rot2(p.y * 2.76 + time * 0.11) * p;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.92 + time * 0.27, vec3(0.58, 0.57, 0.54), vec3(0.34, 0.35, 0.45), vec3(0.86, 1.29, 1.14), vec3(0.88, 0.59, 0.93));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.48));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
