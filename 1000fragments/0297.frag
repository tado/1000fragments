uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 8.22 + sin(p.y * 2.61 + t * 1.65) * 2.21 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(1.37) * p;
	p = rot2(length(p) * 3.00 + time * 0.50) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.36, 0.59, 0.92) + vec3(0.12, 0.27, 0.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
