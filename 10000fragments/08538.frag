uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.45 + t * 2.36 + ph) + sin(p.y * 13.35 - t * 1.39 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 20.68 + sin(p.y * 4.72 + t * 1.23) * 2.04 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -0.93) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.38);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.33 + time * 0.01, vec3(0.50, 0.55, 0.57), vec3(0.43, 0.43, 0.37), vec3(1.11, 1.23, 0.73), vec3(0.36, 0.33, 0.77));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
