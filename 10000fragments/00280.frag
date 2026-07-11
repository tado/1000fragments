uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.02 + t * 5.79 + ph) + sin(p.y * 10.47 - t * 3.80 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.35 / wf * sin(wf * 3.40 * p.y + time * 1.97); p.y += 0.31 / wf * cos(wf * 3.74 * p.x + time * 1.18); }
	p = rot2(p.y * 1.70 + time * 0.43) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.68 + time * 0.10, vec3(0.45, 0.53, 0.51), vec3(0.47, 0.43, 0.49), vec3(1.00, 1.32, 1.19), vec3(0.79, 0.25, 0.16));
	col = fract(col * 1.83);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
