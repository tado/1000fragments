uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.47 + sr * 9.21 - t * 3.31 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * -1.92 + time * 1.15) * p;
	p = (floor(p * 26.0) + 0.5) / 26.0;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.54, lr * 1.18 + time * -0.39); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.31; p = rot2(2.45) * p; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.87, 0.72, 0.50) * (0.24 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
