uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.66 + t * 1.43 + ph) + sin(p.y * 13.82 - t * 4.38 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.63 + t * 5.32 + ph) + sin(p.y * 12.17 - t * 4.21 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 1.49) - 0.5;
	p *= 3.39;
	p = rot2(p.y * 2.91 + time * 0.85) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.30);
	float d = d1 * d2;
	vec3 col = palette(d * 1.31 + time * 0.04, vec3(0.55, 0.43, 0.57), vec3(0.43, 0.40, 0.49), vec3(1.23, 1.05, 0.71), vec3(0.44, 0.69, 0.17));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
