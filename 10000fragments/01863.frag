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
    v = sin(sa * 11.21 + sr * 7.34 - t * 2.44 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.43;
	p = fract(p * 1.90) - 0.5;
	p *= 3.48;
	p = rot2(length(p) * 1.35 + time * 0.42) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.40 + time * 0.14, vec3(0.48, 0.58, 0.56), vec3(0.39, 0.32, 0.34), vec3(0.80, 0.73, 1.05), vec3(0.16, 0.62, 0.52));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
