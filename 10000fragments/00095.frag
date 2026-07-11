uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.97 + t * 3.17 + ph) + sin(p.y * 2.54 - t * 3.86 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.63;
	p += vec2(-0.94, -0.24) * sin(length(p) * 2.44 - time * 0.75) * 0.15;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.15, lr * 1.22 + time * -0.48); }
	p = rot2(length(p) * -2.56 + time * 0.20) * p;
	p = rot2(p.y * 2.75 + time * 0.46) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.26), field(p, time, 2.52));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
