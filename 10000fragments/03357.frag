uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.54) - 0.5;
    float rad = 0.31 + 0.12 * sin(t * 2.74 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.63;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.75, lr * 1.78 + time * 0.76); }
	p = rot2(length(p) * -1.32 + time * 1.18) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.72 + time * 0.14, vec3(0.41, 0.56, 0.56), vec3(0.40, 0.34, 0.34), vec3(0.83, 1.17, 0.83), vec3(0.64, 0.49, 0.56));
	col = fract(col * 1.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
