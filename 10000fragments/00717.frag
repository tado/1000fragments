uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 23.43 + sin(p.y * 3.73 + t * 2.68) * 3.24 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.11;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.11; p = rot2(0.67) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.05, lr * 1.34 + time * 0.26); }
	p += vec2(0.95, 0.84) * sin(length(p) * 4.69 - time * 0.57) * 0.35;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.55, 1.51, 1.44) + vec3(0.06, 0.30, 0.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
