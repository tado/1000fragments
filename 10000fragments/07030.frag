uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.28 + sr * 8.85 - t * 3.66 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 24.05 - t * 5.15 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * 1.15 + time * 0.81) * p;
	p = rot2(3.08) * p;
	p = rot2(time * 1.06) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.42; p = rot2(2.16) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.61);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.54 + time * 0.22, vec3(0.47, 0.58, 0.42), vec3(0.46, 0.50, 0.48), vec3(0.84, 1.08, 1.14), vec3(0.44, 0.17, 0.93));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
