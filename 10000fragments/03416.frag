uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.22) - 0.5;
    float rad = 0.23 + 0.12 * sin(t * 3.81 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.62;
	p *= 2.76;
	p = rot2(length(p) * 2.33 + time * 0.63) * p;
	p = rot2(p.y * -1.64 + time * 0.44) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.20, lr * 1.49 + time * -0.72); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.07), field(p, time, 2.14));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.09, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
