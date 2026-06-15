uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 8.12 + sin(p.y * 4.94 + t * 3.34) * 3.99 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.27;
	p = abs(p) - 0.26;
	p *= 2.20;
	p = rot2(2.35) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.91, 1.39, 0.52) + vec3(0.20, 0.10, 0.19);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
