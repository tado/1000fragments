uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 12.87 - t * 4.38 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.62) - 0.5;
    float rad = 0.23 + 0.12 * sin(t * 0.60 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.70;
	p = rot2(p.y * 1.83 + time * 0.68) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.41 / wf * sin(wf * 2.75 * p.y + time * 1.43); p.y += 0.21 / wf * cos(wf * 2.38 * p.x + time * 1.64); }
	p *= 1.36;
	{ float fr = length(p); p *= 1.0 + 0.63 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.84);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.75 + time * 0.12, vec3(0.43, 0.57, 0.56), vec3(0.41, 0.40, 0.40), vec3(1.10, 0.81, 1.21), vec3(0.43, 0.20, 0.81));
	col = mod(col * 2.53, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
