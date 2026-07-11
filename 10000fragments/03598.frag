uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.81) - 0.5;
    float rad = 0.40 + 0.12 * sin(t * 3.67 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.06, lr * 2.20 + time * 0.73); }
	{ p = vec2(atan(p.y, p.x) * 1.51, length(p) * 5.28 - time * 0.80); }
	p = rot2(time * 0.78) * p;
	p += vec2(0.59, 0.75) * sin(length(p) * 5.92 - time * 1.00) * 0.29;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.88, 0.71, 1.02) + vec3(0.00, 0.25, 0.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
