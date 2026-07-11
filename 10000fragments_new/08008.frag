uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 5.0 + qr * 6.54 * sin(t * 0.48) + t * 3.94 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.68;
	p = rot2(length(p) * -1.20 + time * 1.00) * p;
	{ float fr = length(p); p *= 1.0 + 0.64 * fr * fr; }
	p = rot2(2.08) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.10), field(p, time, 2.20));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.17, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
