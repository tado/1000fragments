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
    float petal = 0.42 + 0.16 * cos(sa * 5 + t * 2.71 + ph);
    v = sin((sr - petal) * 14.63);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 7.00 + sin(p.y * 3.49 + t * 5.80) * 1.89 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.22;
	p = rot2(2.06) * p;
	p = rot2(p.y * 3.02 + time * 0.91) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.66);
	float d = d1 + d2;
	vec3 col = palette(d * 1.75 + time * 0.12, vec3(0.48, 0.56, 0.48), vec3(0.48, 0.31, 0.40), vec3(0.77, 1.23, 1.18), vec3(0.72, 0.09, 0.07));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
