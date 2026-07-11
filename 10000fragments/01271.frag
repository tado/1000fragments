uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.02 + t * 1.28 + ph) + sin(p.y * 12.74 - t * 1.28 + ph)
        + sin((p.x + p.y) * 3.29 + t * 1.28 + ph) + sin(length(p) * 11.96 - t * 1.28 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.77;
	p = rot2(0.38) * p;
	p += vec2(0.07, 0.54) * sin(length(p) * 5.66 - time * 1.69) * 0.10;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.23 / wf * sin(wf * 2.21 * p.y + time * 1.28); p.y += 0.21 / wf * cos(wf * 3.22 * p.x + time * 1.73); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.08 + time * 0.19, vec3(0.44, 0.47, 0.42), vec3(0.47, 0.32, 0.36), vec3(1.20, 0.85, 1.37), vec3(0.45, 0.67, 0.06));
	col = fract(col * 2.47);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
