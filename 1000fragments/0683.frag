uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 13.43 - t * 3.24 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * -1.36 + time * 1.17) * p;
	p = abs(p) - 0.56;
	p = fract(p * 2.30) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.88 + time * 0.22, vec3(0.40, 0.48, 0.45), vec3(0.36, 0.35, 0.46), vec3(1.00, 1.24, 0.83), vec3(0.32, 0.52, 0.33));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
