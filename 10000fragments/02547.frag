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
    float petal = 0.65 + 0.25 * cos(sa * 9 + t * 0.44 + ph);
    v = sin((sr - petal) * 13.88);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 36.07 - t * 1.28 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.29;
	p += vec2(-0.14, 0.06) * sin(length(p) * 4.89 - time * 1.19) * 0.14;
	p = rot2(length(p) * -3.90 + time * 0.88) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.91);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.69 + time * 0.21, vec3(0.45, 0.52, 0.42), vec3(0.41, 0.47, 0.39), vec3(0.79, 1.33, 0.92), vec3(0.95, 0.70, 0.41));
	col = clamp((col - 0.5) * 1.79 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
