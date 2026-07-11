uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 13.87 + sin(p.y * 4.05 + t * 2.55) * 1.18 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(3.09) * p;
	p += vec2(-0.17, -0.39) * sin(length(p) * 2.27 - time * 1.85) * 0.29;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.34, 1.11, 1.30) + vec3(0.28, 0.28, 0.23);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
