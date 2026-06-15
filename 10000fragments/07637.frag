uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 7.66 + sin(p.y * 2.14 + t * 5.72) * 2.51 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * 1.10) * p;
	p *= 1.30;
	p = fract(p * 2.77) - 0.5;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.49 / wf * sin(wf * 1.88 * p.y + time * 1.19); p.y += 0.21 / wf * cos(wf * 1.98 * p.x + time * 1.29); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.26 + time * 0.26, vec3(0.57, 0.58, 0.56), vec3(0.43, 0.48, 0.37), vec3(0.87, 0.88, 1.34), vec3(0.29, 0.83, 0.55));
	col = fract(col * 1.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
