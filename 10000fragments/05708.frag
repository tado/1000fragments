uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.27, 0.0)) * 14.64 - t * 5.70 + ph);
    float mb = sin(length(p + vec2(0.27, 0.0)) * 36.45 - t * 5.70 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 2.75, length(p) * 3.96 - time * 0.24); }
	p = rot2(2.41) * p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.48 / wf * sin(wf * 1.66 * p.y + time * 0.91); p.y += 0.41 / wf * cos(wf * 3.90 * p.x + time * 1.40); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.16 + time * 0.12, vec3(0.46, 0.45, 0.58), vec3(0.39, 0.46, 0.33), vec3(0.78, 0.80, 0.76), vec3(0.01, 0.32, 0.73));
	col = mod(col * 2.33, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
