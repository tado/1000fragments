uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.22, 0.0)) * 35.79 - t * 4.80 + ph);
    float mb = sin(length(p + vec2(0.22, 0.0)) * 22.62 - t * 4.80 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 36.78 - t * 7.90 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(-0.35, -0.77) * sin(length(p) * 2.75 - time * 0.96) * 0.25;
	{ p = vec2(atan(p.y, p.x) * 1.01, length(p) * 3.98 - time * 0.49); }
	p = rot2(2.00) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.02);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.36 + time * 0.19, vec3(0.47, 0.43, 0.56), vec3(0.42, 0.36, 0.36), vec3(1.00, 0.90, 1.34), vec3(0.41, 0.74, 0.83));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
