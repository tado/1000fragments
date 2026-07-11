uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.43 + t * 2.24 + ph) + sin(p.y * 4.45 - t * 2.79 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.33 + 0.19 * cos(sa * 6 + t * 0.73 + ph);
    v = sin((sr - petal) * 19.26);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.64;
	p = rot2(length(p) * 1.14 + time * 0.36) * p;
	p = rot2(time * -0.94) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.28);
	float d = d1 * d2;
	vec3 col = palette(d * 1.43 + time * 0.05, vec3(0.53, 0.40, 0.41), vec3(0.45, 0.39, 0.50), vec3(1.07, 0.91, 1.03), vec3(0.50, 0.34, 0.36));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.49));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
