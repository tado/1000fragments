uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.07, t * 0.88 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(length(p) * 2.21 + time * 0.60) * p;
	{ float fr = length(p); p *= 1.0 + -0.29 * fr * fr; }
	p = abs(p) - 0.74;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.43 + time * 0.16, vec3(0.56, 0.45, 0.40), vec3(0.37, 0.46, 0.48), vec3(1.25, 0.81, 1.39), vec3(0.43, 0.90, 0.09));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.54));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
