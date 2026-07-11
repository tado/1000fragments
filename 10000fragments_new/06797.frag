uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.51 + t * 4.80 + ph) + sin(p.y * 2.29 - t * 4.82 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + -0.60 * fr * fr; }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.33; p = rot2(1.97) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.26, lr * 1.53 + time * -0.49); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.71, 0.62, 0.32) * (0.14 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col = fract(col * 2.15);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
