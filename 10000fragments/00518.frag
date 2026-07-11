uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 7.35 + sin(p.y * 1.32 + t * 2.85) * 4.97 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.95;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.26, lr * 1.97 + time * -0.13); }
	p = rot2(length(p) * 2.47 + time * 0.64) * p;
	p += vec2(0.19, 0.65) * sin(length(p) * 4.40 - time * 1.65) * 0.25;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.78), field(p, time, 1.56));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
