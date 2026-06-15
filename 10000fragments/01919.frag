uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.95, t * 0.83 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.39, 0.0)) * 27.91 - t * 4.95 + ph);
    float mb = sin(length(p + vec2(0.39, 0.0)) * 24.76 - t * 4.95 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.79;
	p = rot2(0.96) * p;
	p += vec2(0.87, -0.29) * sin(length(p) * 3.96 - time * 0.98) * 0.32;
	p = rot2(length(p) * 1.30 + time * 1.06) * p;
	p = rot2(p.y * -2.39 + time * 0.26) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.31);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.50 + time * 0.17, vec3(0.55, 0.45, 0.59), vec3(0.48, 0.48, 0.35), vec3(1.28, 0.97, 0.74), vec3(0.37, 0.06, 0.89));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.50));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
