uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 21.38 + sin(p.y * 5.29 + t * 5.37) * 2.18 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.92;
	p += vec2(-0.24, -0.33) * sin(length(p) * 2.39 - time * 0.91) * 0.27;
	p = rot2(0.31) * p;
	p = rot2(length(p) * -2.40 + time * 0.63) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.63, 1.44, 1.36) + vec3(0.17, 0.28, 0.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
