uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.16) - 0.5;
    float rad = 0.43 + 0.12 * sin(t * 1.98 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.80;
	p = rot2(p.y * -3.41 + time * 0.60) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.35, lr * 2.33 + time * -0.63); }
	p = rot2(1.53) * p;
	{ float fr = length(p); p *= 1.0 + 0.33 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.01), field(p, time, 2.01));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
