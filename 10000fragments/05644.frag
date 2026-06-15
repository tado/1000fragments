uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.48, 0.0)) * 13.45 - t * 7.77 + ph);
    float mb = sin(length(p + vec2(0.48, 0.0)) * 35.79 - t * 7.77 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = fract(p * 1.00) - 0.5;
	p = rot2(2.73) * p;
	{ p = vec2(atan(p.y, p.x) * 1.61, length(p) * 5.35 - time * 0.12); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.58 + time * 0.03, vec3(0.52, 0.47, 0.50), vec3(0.47, 0.47, 0.31), vec3(0.98, 1.07, 1.13), vec3(0.31, 0.49, 0.14));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
