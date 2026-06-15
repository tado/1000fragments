uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 7.86 + sin(p.y * 4.50 + t * 3.69) * 2.71 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.57, 0.0)) * 31.83 - t * 3.64 + ph);
    float mb = sin(length(p + vec2(0.57, 0.0)) * 25.01 - t * 3.64 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.03;
	p = rot2(p.y * 2.78 + time * 0.76) * p;
	p = rot2(2.11) * p;
	p *= 1.61;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 3.43 * p.y + time * 0.65); p.y += 0.39 / wf * cos(wf * 3.72 * p.x + time * 1.64); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.50);
	float d = d1 * d2;
	vec3 col = palette(d * 1.47 + time * 0.18, vec3(0.50, 0.56, 0.47), vec3(0.36, 0.38, 0.43), vec3(1.03, 1.07, 1.39), vec3(0.68, 0.12, 0.98));
	col = clamp((col - 0.5) * 2.01 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
