uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 7.0 + qr * 5.03 * sin(t * 0.95) + t * 1.05 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.78;
	p = rot2(p.y * -3.66 + time * 1.18) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.47, lr * 1.59 + time * 0.88); }
	p = (floor(p * 11.9) + 0.5) / 11.9;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.32; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.59 + time * 0.06, vec3(0.41, 0.53, 0.52), vec3(0.47, 0.44, 0.32), vec3(0.90, 0.75, 1.12), vec3(0.53, 0.15, 0.14));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
