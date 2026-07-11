uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 4.69 + t * 0.35) - 0.5) * 2.0;
    v = sin((p.y * 6.13 + zx * 0.61 + t * 2.43) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.09;
	p += vec2(-0.94, 0.09) * sin(length(p) * 4.38 - time * 2.34) * 0.15;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.33, lr * 2.45 + time * -0.38); }
	p = rot2(p.y * -3.81 + time * 1.09) * p;
	p = sin(p * 2.28 + time * 1.40) * 0.64;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.34), field(p, time, 0.68));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 2.02 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
