uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.42 + 0.15 * pow(abs(cos(ra * 5.0 + t * 2.72)), 2.67);
    v = sin((rr - pet) * 19.03 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.03;
	p = (floor(p * 22.3) + 0.5) / 22.3;
	p = fract(p * 2.50) - 0.5;
	p = rot2(p.y * -2.35 + time * 0.92) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.17, 0.02, 0.14), vec3(0.65, 0.74, 0.65), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
