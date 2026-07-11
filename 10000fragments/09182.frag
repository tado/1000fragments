uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 37.16 - t * 3.90 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.97 + jf * 4.0), cos(t * 0.11 * jf)) * 0.45;
        xs += sin(length(p - im) * 153.45 - t * 8.69 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float fr = length(p); p *= 1.0 + -0.49 * fr * fr; }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 3.05 * p.y + time * 1.15); p.y += 0.46 / wf * cos(wf * 3.21 * p.x + time * 1.03); }
	p = rot2(length(p) * -3.55 + time * 0.41) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.36);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.19 + time * 0.08, vec3(0.51, 0.55, 0.44), vec3(0.44, 0.37, 0.48), vec3(0.74, 0.99, 1.05), vec3(0.22, 0.01, 0.88));
	col = fract(col * 2.47);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
