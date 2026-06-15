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
    v = sin(sa * 10.08 + sr * 16.56 - t * 1.49 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.54;
	p = rot2(length(p) * -1.42 + time * 0.58) * p;
	p = rot2(p.y * -1.60 + time * 0.68) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.46 + time * 0.04, vec3(0.50, 0.47, 0.54), vec3(0.47, 0.39, 0.36), vec3(0.91, 0.95, 1.25), vec3(0.05, 0.24, 0.61));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
