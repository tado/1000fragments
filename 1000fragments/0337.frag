uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 18.39 + sin(p.y * 3.55 + t * 4.85) * 1.55 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.07;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.22 / wf * sin(wf * 3.33 * p.y + time * 1.88); p.y += 0.24 / wf * cos(wf * 2.24 * p.x + time * 1.35); }
	p = rot2(time * -0.81) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.95 + time * 0.17, vec3(0.54, 0.52, 0.45), vec3(0.40, 0.31, 0.38), vec3(1.10, 1.26, 1.20), vec3(0.69, 0.65, 0.08));
	col = mod(col * 1.49, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
