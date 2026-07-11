uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 15.61 - t * 5.57 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.04;
	p += vec2(-0.97, 0.75) * sin(length(p) * 2.31 - time * 1.27) * 0.35;
	p = rot2(p.y * -1.82 + time * 0.91) * p;
	p = rot2(time * -0.63) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.40, 1.27, 1.17) + vec3(0.09, 0.03, 0.10);
	col = mod(col * 2.01, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
