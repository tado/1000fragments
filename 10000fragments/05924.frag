uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.97 + t * 4.68 + ph) + sin(p.y * 5.72 - t * 4.68 + ph)
        + sin((p.x + p.y) * 8.12 + t * 4.68 + ph) + sin(length(p) * 8.46 - t * 4.68 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.68;
	p = fract(p * 2.32) - 0.5;
	p = rot2(length(p) * -3.34 + time * 0.45) * p;
	p = rot2(2.77) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.35 / wf * sin(wf * 2.07 * p.y + time * 1.90); p.y += 0.37 / wf * cos(wf * 3.62 * p.x + time * 1.43); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.29 + time * 0.10, vec3(0.47, 0.46, 0.49), vec3(0.47, 0.40, 0.40), vec3(0.87, 1.14, 1.38), vec3(0.97, 0.84, 0.47));
	col = fract(col * 2.38);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
