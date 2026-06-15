uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.45, t * 1.88 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = fract(p * 2.44) - 0.5;
	p = rot2(length(p) * 3.98 + time * 0.29) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.32 / wf * sin(wf * 2.36 * p.y + time * 1.12); p.y += 0.39 / wf * cos(wf * 3.00 * p.x + time * 1.00); }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.22; p = rot2(1.46) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.79 + time * 0.12, vec3(0.48, 0.52, 0.51), vec3(0.40, 0.40, 0.49), vec3(1.23, 1.13, 0.92), vec3(0.33, 0.34, 0.94));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
