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
    v = sin(sa * 7.31 + sr * 13.15 - t * 3.19 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.82;
	p = rot2(length(p) * 1.36 + time * 0.44) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.71 + time * 0.15, vec3(0.47, 0.56, 0.41), vec3(0.44, 0.46, 0.42), vec3(0.73, 1.01, 1.38), vec3(0.34, 0.77, 0.94));
	col = mod(col * 1.56, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
