uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.37) - 0.5;
    float rad = 0.24 + 0.12 * sin(t * 3.77 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.13, lr * 1.17 + time * 0.19); }
	p = rot2(time * -1.15) * p;
	{ p = vec2(atan(p.y, p.x) * 1.01, length(p) * 5.74 - time * 0.62); }
	p *= 2.95;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.62 + time * 0.06);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.23));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
