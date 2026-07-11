uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 5.64 + sin(p.y * 1.17 + t * 5.41) * 2.29 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * 0.37) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.58, 0.82, 0.68) + vec3(0.18, 0.14, 0.29);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.69));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
