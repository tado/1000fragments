uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.47, 0.0)) * 38.46 - t * 5.59 + ph);
    float mb = sin(length(p + vec2(0.47, 0.0)) * 29.37 - t * 5.59 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 2.53, length(p) * 4.12 - time * 0.10); }
	p = rot2(p.y * 2.84 + time * 0.63) * p;
	p += vec2(0.60, -0.67) * sin(length(p) * 2.44 - time * 1.87) * 0.29;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.88 + time * 0.06, vec3(0.55, 0.53, 0.50), vec3(0.37, 0.34, 0.48), vec3(0.84, 0.99, 0.72), vec3(0.39, 0.34, 0.23));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.16));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
