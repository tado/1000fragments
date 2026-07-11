uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.21, t * 1.87 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.24;
	p.y += sin(p.x * 4.80 + time * 1.03) * 0.39;
	p = rot2(p.y * 2.41 + time * 0.32) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.14 + time * 0.30, vec3(0.45, 0.40, 0.55), vec3(0.33, 0.37, 0.34), vec3(1.20, 0.96, 1.26), vec3(0.20, 0.26, 0.96));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.51));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
