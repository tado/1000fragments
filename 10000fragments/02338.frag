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
    v = sin(sa * 11.94 + sr * 21.27 - t * 3.79 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.42;
	{ p = vec2(atan(p.y, p.x) * 1.84, length(p) * 5.43 - time * 0.28); }
	p = rot2(1.45) * p;
	p = rot2(p.y * 2.78 + time * 0.99) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.17 + time * 0.27, vec3(0.58, 0.44, 0.56), vec3(0.38, 0.44, 0.38), vec3(1.31, 1.40, 0.76), vec3(0.88, 0.23, 0.02));
	col = clamp((col - 0.5) * 1.32 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
