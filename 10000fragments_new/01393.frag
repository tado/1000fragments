uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 12.05 + sin(p.y * 3.70 + t * 3.41) * 4.04 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 18.11 + sin(p.y * 3.70 + t * 2.92) * 3.86 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.71;
	p = rot2(3.01) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.84);
	float d = d1 * d2;
	vec3 col = palette(d * 0.81 + time * 0.11, vec3(0.49, 0.45, 0.55), vec3(0.35, 0.47, 0.45), vec3(1.10, 0.92, 1.36), vec3(0.35, 0.40, 0.77));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.20));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
