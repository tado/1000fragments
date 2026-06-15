uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.32 + t * 3.42 + ph) + sin(p.y * 2.60 - t * 3.42 + ph)
        + sin((p.x + p.y) * 9.22 + t * 3.42 + ph) + sin(length(p) * 5.15 - t * 3.42 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 3.86 * p.y + time * 0.84); p.y += 0.41 / wf * cos(wf * 1.97 * p.x + time * 1.69); }
	p = abs(p);
	p += vec2(0.65, -0.17) * sin(length(p) * 3.99 - time * 1.04) * 0.10;
	p = rot2(p.y * 2.16 + time * 0.16) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.98 + time * 0.01, vec3(0.49, 0.44, 0.54), vec3(0.41, 0.47, 0.35), vec3(1.12, 1.12, 1.23), vec3(0.97, 0.46, 0.07));
	col = mod(col * 2.02, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
