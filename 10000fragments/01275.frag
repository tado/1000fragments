uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.88 + t * 2.46 + ph) + sin(p.y * 12.86 - t * 2.46 + ph)
        + sin((p.x + p.y) * 3.95 + t * 2.46 + ph) + sin(length(p) * 16.22 - t * 2.46 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 19.58 + sin(p.y * 4.27 + t * 3.66) * 4.79 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = abs(p) - 0.53;
	p = rot2(1.67) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.40);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.69 + time * 0.03, vec3(0.55, 0.43, 0.55), vec3(0.47, 0.32, 0.30), vec3(0.88, 1.37, 0.99), vec3(0.05, 0.50, 0.43));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.72));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
