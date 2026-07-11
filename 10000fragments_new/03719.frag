uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.59, t * 2.18 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = (floor(p * 8.0) + 0.5) / 8.0;
	p = rot2(length(p) * 3.19 + time * 1.34) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.98 + time * 0.11, vec3(0.48, 0.41, 0.41), vec3(0.31, 0.44, 0.35), vec3(1.16, 0.87, 1.20), vec3(0.62, 0.70, 0.48));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
