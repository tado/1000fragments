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
    float petal = 0.45 + 0.15 * cos(sa * 5 + t * 0.93 + ph);
    v = sin((sr - petal) * 13.02);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.65 + 0.13 * cos(sa * 4 + t * 2.81 + ph);
    v = sin((sr - petal) * 7.98);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.96;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.40; p = rot2(1.35) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.30);
	float d = d1 + d2;
	vec3 col = palette(d * 1.22 + time * 0.22, vec3(0.56, 0.51, 0.43), vec3(0.39, 0.36, 0.44), vec3(1.10, 1.15, 0.85), vec3(0.00, 0.58, 0.90));
	col = clamp((col - 0.5) * 1.24 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
