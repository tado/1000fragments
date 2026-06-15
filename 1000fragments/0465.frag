uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 8.73 - t * 4.61 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * 1.86 + time * 0.98) * p;
	p += vec2(-0.60, 0.82) * sin(length(p) * 5.94 - time * 1.85) * 0.15;
	p = rot2(time * 1.21) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.32 + time * 0.07, vec3(0.53, 0.50, 0.41), vec3(0.47, 0.35, 0.47), vec3(1.04, 0.81, 1.15), vec3(0.42, 0.36, 0.20));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
