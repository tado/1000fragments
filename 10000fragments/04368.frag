uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.33 + 0.20 * pow(abs(cos(ra * 5.0 + t * 2.98)), 1.47);
    v = sin((rr - pet) * 13.10 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p.y += sin(p.x * 7.66 + time * 3.48) * 0.27;
	p += vec2(0.68, -0.20) * sin(length(p) * 5.62 - time * 0.99) * 0.25;
	p = rot2(time * 0.97) * p;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.55, 0.94, 1.53) + vec3(0.06, 0.04, 0.21);
	col = clamp((col - 0.5) * 2.14 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
