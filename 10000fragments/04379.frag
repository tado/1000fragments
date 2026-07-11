uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.21, 0.0)) * 19.87 - t * 4.01 + ph);
    float mb = sin(length(p + vec2(0.21, 0.0)) * 21.89 - t * 4.01 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.02;
	p *= 1.33;
	p = rot2(length(p) * -3.14 + time * 0.44) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.27, lr * 2.58 + time * 0.15); }
	p = rot2(p.y * 3.68 + time * 0.71) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.37), field(p, time, 2.75));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
