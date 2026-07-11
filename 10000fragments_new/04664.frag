uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.13, t * 1.57 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 3.05;
	p.x += sin(p.y * 7.65 + time * 3.48) * 0.16;
	p = rot2(length(p) * -1.15 + time * 1.25) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.49 + time * 0.24, vec3(0.46, 0.54, 0.60), vec3(0.41, 0.39, 0.40), vec3(1.06, 1.21, 1.15), vec3(0.83, 0.52, 0.71));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.57));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
