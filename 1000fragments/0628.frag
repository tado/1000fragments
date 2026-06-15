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
    v = sin(sa * 6.65 + sr * 5.79 - t * 3.22 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(1.86) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.30 + time * 0.10, vec3(0.47, 0.60, 0.59), vec3(0.46, 0.50, 0.43), vec3(1.34, 1.00, 1.15), vec3(0.49, 0.55, 0.94));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
