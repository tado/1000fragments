uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 22.97 + sin(p.y * 3.72 + t * 1.86) * 1.62 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(0.19, -0.81) * sin(length(p) * 5.18 - time * 1.59) * 0.22;
	p = rot2(length(p) * -2.47 + time * 1.11) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.04 + time * 0.01, vec3(0.47, 0.43, 0.51), vec3(0.42, 0.39, 0.37), vec3(1.30, 1.22, 0.95), vec3(0.08, 0.92, 0.41));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
