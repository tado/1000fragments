uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 11.0 + qr * 3.43 * sin(t * 1.26) + t * 3.57 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.38;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.41, lr * 1.95 + time * 0.35); }
	p = rot2(p.y * -1.61 + time * 1.10) * p;
	p = (floor(p * 12.2) + 0.5) / 12.2;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.30), field(p, time, 2.59));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
