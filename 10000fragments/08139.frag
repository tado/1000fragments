uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.54) - 0.5;
    float rad = 0.26 + 0.12 * sin(t * 0.62 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.14, lr * 1.33 + time * 0.68); }
	p = rot2(p.y * -1.65 + time * 0.44) * p;
	p = fract(p * 1.88) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.57 + time * 0.19, vec3(0.46, 0.59, 0.49), vec3(0.30, 0.34, 0.46), vec3(0.73, 1.34, 0.76), vec3(0.59, 0.31, 0.42));
	col = mod(col * 1.25, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
