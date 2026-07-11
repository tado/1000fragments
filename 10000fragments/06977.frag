uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.03, t * 1.30 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.25, 0.0)) * 8.86 - t * 1.14 + ph);
    float mb = sin(length(p + vec2(0.25, 0.0)) * 22.24 - t * 1.14 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.04;
	p += vec2(-0.04, 0.67) * sin(length(p) * 5.68 - time * 1.81) * 0.38;
	p = fract(p * 2.95) - 0.5;
	p = abs(p) - 0.43;
	p = rot2(time * 0.94) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.45);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.69 + time * 0.19, vec3(0.54, 0.46, 0.55), vec3(0.36, 0.39, 0.45), vec3(0.73, 1.09, 0.92), vec3(0.88, 0.81, 0.56));
	col = fract(col * 2.39);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
