uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.49 + 0.29 * pow(abs(cos(ra * 2.0 + t * 2.57)), 2.38);
    v = sin((rr - pet) * 12.54 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * 1.56 + time * 0.32) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.06, 1.06, 0.61) + vec3(0.28, 0.03, 0.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
