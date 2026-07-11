uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.39, t * 0.67 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.55 + sr * 4.14 - t * 2.88 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.31;
	p += vec2(0.07, 0.52) * sin(length(p) * 3.21 - time * 1.94) * 0.23;
	p = rot2(p.y * 2.35 + time * 0.60) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.35);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.91 + time * 0.25, vec3(0.45, 0.40, 0.54), vec3(0.35, 0.49, 0.37), vec3(0.92, 0.99, 1.26), vec3(0.58, 0.05, 0.52));
	col = fract(col * 1.80);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
