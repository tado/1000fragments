uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 2.13 + t * 5.63 + ph) + sin(p.y * 3.11 - t * 3.35 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.49, t * 1.65 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.78;
	p += vec2(-0.46, -0.97) * sin(length(p) * 5.38 - time * 0.64) * 0.30;
	p = rot2(p.y * -1.10 + time * 0.36) * p;
	p = rot2(length(p) * 3.58 + time * 0.54) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.50);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.63 + time * 0.08, vec3(0.43, 0.40, 0.51), vec3(0.42, 0.42, 0.46), vec3(1.38, 1.15, 1.02), vec3(0.77, 0.20, 0.52));
	col = mod(col * 1.70, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
