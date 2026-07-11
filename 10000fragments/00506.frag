uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 9.11 + sin(p.y * 5.78 + t * 3.78) * 2.42 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.46;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.49, lr * 1.81 + time * -0.35); }
	p = rot2(time * 0.62) * p;
	p = rot2(1.33) * p;
	p = fract(p * 1.13) - 0.5;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.04, 0.08, 0.58), vec3(0.66, 0.86, 0.63), d);
	col = mod(col * 1.91, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
