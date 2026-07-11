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
    v = sin(sa * 7.04 + sr * 10.25 - t * 3.51 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.39;
	{ p = vec2(atan(p.y, p.x) * 2.93, length(p) * 3.19 - time * 0.23); }
	p = rot2(p.y * 3.50 + time * 0.44) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.56 + time * 0.27, vec3(0.57, 0.44, 0.50), vec3(0.43, 0.45, 0.48), vec3(1.35, 1.20, 1.23), vec3(0.96, 0.88, 0.72));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
