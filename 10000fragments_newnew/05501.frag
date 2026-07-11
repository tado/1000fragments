uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 4.17;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.26 + 0.09 * sin(t * 2.83 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.05;
	p *= 1.0 + 0.37 * sin(time * 1.15);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.43, lr * 1.12 + time * 0.97); }
	p = rot2(time * 0.78) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.96 + time * 0.26, vec3(0.58, 0.59, 0.56), vec3(0.41, 0.31, 0.37), vec3(1.03, 0.88, 1.14), vec3(0.02, 0.25, 0.93));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
