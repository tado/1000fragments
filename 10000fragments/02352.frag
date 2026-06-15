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
    v = sin(sa * 11.12 + sr * 14.38 - t * 3.00 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.63 + 0.19 * cos(sa * 8 + t * 0.87 + ph);
    v = sin((sr - petal) * 14.12);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.43;
	p = rot2(1.29) * p;
	p = rot2(p.y * 1.20 + time * 0.23) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.10);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.49 + time * 0.08, vec3(0.58, 0.52, 0.57), vec3(0.37, 0.33, 0.43), vec3(0.81, 0.91, 1.22), vec3(0.16, 0.65, 0.44));
	col = fract(col * 2.15);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
