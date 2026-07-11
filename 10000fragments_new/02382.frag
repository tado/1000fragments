uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.85, t * 0.53 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.48;
	p = (floor(p * 20.9) + 0.5) / 20.9;
	p = rot2(1.29) * p;
	p = fract(p * 2.54) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 1.97, length(p) * 2.29 - time * 0.87); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.18 + time * 0.12, vec3(0.54, 0.47, 0.56), vec3(0.47, 0.32, 0.34), vec3(1.32, 0.96, 1.11), vec3(0.88, 0.05, 0.56));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
