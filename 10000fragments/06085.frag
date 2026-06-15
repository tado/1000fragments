uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.64) - 0.5;
    float rad = 0.32 + 0.12 * sin(t * 1.85 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.10;
	p = rot2(length(p) * -3.13 + time * 0.88) * p;
	p = rot2(0.91) * p;
	{ float fr = length(p); p *= 1.0 + -0.60 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.24, lr * 2.97 + time * 0.40); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.17), field(p, time, 2.33));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
