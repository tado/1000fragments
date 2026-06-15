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
    v = sin(sa * 9.29 + sr * 5.19 - t * 2.40 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(2.65) * p;
	p += vec2(0.28, 0.92) * sin(length(p) * 2.21 - time * 1.31) * 0.34;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.44 + time * 0.13, vec3(0.56, 0.52, 0.59), vec3(0.45, 0.49, 0.39), vec3(0.81, 1.02, 1.07), vec3(0.96, 0.38, 0.57));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
