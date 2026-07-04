uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 23.83 + sin(p.y * 1.46 + t * 2.87) * 1.77 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.88;
	p = sin(p * 2.63 + time * 0.99) * 1.19;
	p = rot2(time * 0.52) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.01, 0.11, 0.44), vec3(0.93, 0.97, 0.50), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
