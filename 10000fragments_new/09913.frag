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
    v = sin(sa * 5.32 + sr * 8.10 - t * 0.69 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.88;
	p *= 2.82;
	p = rot2(time * -1.24) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.26 + time * 0.07, vec3(0.41, 0.46, 0.44), vec3(0.44, 0.45, 0.38), vec3(0.92, 1.22, 0.94), vec3(0.74, 0.64, 0.15));
	col = fract(col * 2.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
