uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.42, 0.0)) * 18.47 - t * 3.17 + ph);
    float mb = sin(length(p + vec2(0.42, 0.0)) * 9.30 - t * 3.17 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.44 / wf * sin(wf * 3.51 * p.y + time * 1.38); p.y += 0.39 / wf * cos(wf * 2.44 * p.x + time * 1.46); }
	p = abs(p);
	p += vec2(0.94, 0.31) * sin(length(p) * 3.08 - time * 1.02) * 0.38;
	p = rot2(time * 0.50) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.85 + time * 0.11, vec3(0.50, 0.42, 0.46), vec3(0.47, 0.35, 0.42), vec3(0.97, 0.98, 1.19), vec3(0.74, 0.58, 0.34));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
