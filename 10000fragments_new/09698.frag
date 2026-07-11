uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.24, 0.0)) * 26.44 - t * 7.22 + ph);
    float mb = sin(length(p + vec2(0.24, 0.0)) * 26.17 - t * 1.90 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.05;
	p += vec2(-0.73, 0.59) * sin(length(p) * 5.16 - time * 2.09) * 0.36;
	p = rot2(2.24) * p;
	p = fract(p * 1.83) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.78 + time * 0.24, vec3(0.51, 0.51, 0.59), vec3(0.47, 0.46, 0.40), vec3(1.07, 1.25, 0.95), vec3(0.22, 0.46, 0.67));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
