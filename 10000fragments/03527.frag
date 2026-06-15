uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 18.70 - t * 6.64 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 9.69 + sin(p.y * 1.86 + t * 1.06) * 4.82 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(0.59) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.48);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.36 + time * 0.06, vec3(0.40, 0.43, 0.48), vec3(0.47, 0.38, 0.39), vec3(1.01, 1.22, 0.73), vec3(0.28, 0.73, 0.74));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
