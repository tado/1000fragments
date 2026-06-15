uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 12.43 + sin(p.y * 1.63 + t * 1.02) * 3.47 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 2.42) - 0.5;
	p = rot2(p.y * 3.62 + time * 0.10) * p;
	p += vec2(-0.77, 0.64) * sin(length(p) * 4.78 - time * 0.91) * 0.14;
	p = rot2(time * -0.86) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.25 + time * 0.28, vec3(0.60, 0.41, 0.51), vec3(0.46, 0.30, 0.31), vec3(0.88, 1.24, 1.20), vec3(0.63, 0.66, 0.27));
	col = fract(col * 2.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
