uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 8.27 - t * 2.44 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.98 + t * 4.53 + ph) + sin(p.y * 6.66 - t * 4.53 + ph)
        + sin((p.x + p.y) * 6.45 + t * 4.53 + ph) + sin(length(p) * 8.39 - t * 4.53 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.35 / wf * sin(wf * 1.51 * p.y + time * 1.69); p.y += 0.32 / wf * cos(wf * 3.12 * p.x + time * 1.75); }
	p = rot2(p.y * -1.92 + time * 0.80) * p;
	p = rot2(1.50) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.51);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.48 + time * 0.10, vec3(0.42, 0.45, 0.40), vec3(0.34, 0.31, 0.42), vec3(1.23, 0.87, 1.38), vec3(0.33, 0.50, 0.35));
	col = clamp((col - 0.5) * 1.46 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
