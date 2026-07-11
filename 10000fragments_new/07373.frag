uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.25, t * 2.23 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.59;
	p += vec2(0.55, 0.40) * sin(length(p) * 5.05 - time * 2.45) * 0.29;
	p = rot2(p.y * 2.24 + time * 0.30) * p;
	p *= 3.09;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.35, lr * 1.24 + time * -0.27); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.28, 0.07, 0.58), vec3(0.96, 0.77, 0.48), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
