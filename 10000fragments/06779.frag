uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.54, t * 1.45 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 37.09 - t * 6.14 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = abs(p) - 0.78;
	{ p = vec2(atan(p.y, p.x) * 2.83, length(p) * 3.45 - time * 0.11); }
	p = rot2(1.47) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.96);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.58 + time * 0.03, vec3(0.50, 0.57, 0.48), vec3(0.40, 0.42, 0.34), vec3(1.24, 1.03, 1.39), vec3(0.38, 0.24, 0.50));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
