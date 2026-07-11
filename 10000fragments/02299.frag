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
    float petal = 0.53 + 0.13 * cos(sa * 9 + t * 2.18 + ph);
    v = sin((sr - petal) * 8.43);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.32; p = rot2(2.37) * p; }
	p *= 1.28;
	p = fract(p * 2.52) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 1.04, length(p) * 3.57 - time * 0.75); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.24 + time * 0.17, vec3(0.59, 0.44, 0.52), vec3(0.33, 0.37, 0.37), vec3(0.92, 0.89, 1.15), vec3(0.50, 0.36, 0.88));
	col = mod(col * 1.95, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
