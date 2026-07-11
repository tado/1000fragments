uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.05) - 0.5;
    float rad = 0.42 + 0.12 * sin(t * 3.58 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.16;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.43; p = rot2(2.10) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.47, lr * 1.50 + time * -0.83); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.98), field(p, time, 1.95));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
