uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 12.0 + qr * 6.08 * sin(t * 1.18) + t * 2.25 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.13;
	p = rot2(time * 0.37) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 1.93 * p.y + time * 1.43); p.y += 0.32 / wf * cos(wf * 3.48 * p.x + time * 0.77); }
	p.x += sin(p.y * 7.27 + time * 1.71) * 0.18;
	p += vec2(0.11, 0.24) * sin(length(p) * 2.40 - time * 2.06) * 0.30;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.70 + time * 0.16, vec3(0.45, 0.46, 0.41), vec3(0.42, 0.44, 0.47), vec3(0.91, 1.12, 1.10), vec3(0.07, 0.92, 0.05));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
