uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.16 + t * 4.39 + ph) + sin(p.y * 8.05 - t * 1.71 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.20;
	p += vec2(0.52, -0.40) * sin(length(p) * 5.11 - time * 1.15) * 0.36;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.12; p = rot2(2.21) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.44, lr * 1.39 + time * -0.67); }
	{ p = vec2(atan(p.y, p.x) * 1.96, length(p) * 4.66 - time * 0.56); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.50, 1.57, 1.40) + vec3(0.19, 0.26, 0.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
