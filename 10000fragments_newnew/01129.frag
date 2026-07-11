uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 24.38 + sin(p.y * 2.84 + t * 2.74) * 2.10 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.14;
	p = rot2(1.14) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.72, 0.81, 0.48) * (0.07 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col = fract(col * 1.61);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
