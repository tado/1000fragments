uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 8.49 + sin(p.y * 3.97 + t * 2.44) * 4.74 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.62;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.22; p = rot2(0.84) * p; }
	p = rot2(time * -1.18) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.44 / wf * sin(wf * 2.48 * p.y + time * 0.84); p.y += 0.43 / wf * cos(wf * 2.92 * p.x + time * 0.94); }
	p = rot2(p.y * -3.48 + time * 0.22) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.83 + time * 0.24, vec3(0.44, 0.42, 0.59), vec3(0.31, 0.31, 0.44), vec3(1.25, 1.08, 0.82), vec3(0.21, 0.97, 0.55));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.94));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
