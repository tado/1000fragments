uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.75 + t * 4.77 + ph) + sin(p.y * 9.23 - t * 4.77 + ph)
        + sin((p.x + p.y) * 3.27 + t * 4.77 + ph) + sin(length(p) * 6.26 - t * 4.77 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.86, t * 1.18 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.44;
	p = rot2(0.93) * p;
	p = abs(p);
	p = rot2(length(p) * -1.85 + time * 1.16) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.57);
	float d = d1 + d2;
	vec3 col = palette(d * 0.79 + time * 0.28, vec3(0.49, 0.55, 0.53), vec3(0.35, 0.39, 0.45), vec3(0.83, 1.34, 1.19), vec3(0.05, 0.31, 0.57));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
