uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.41) - 0.5;
    float rad = 0.27 + 0.12 * sin(t * 0.79 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.74;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.04, lr * 2.40 + time * 0.23); }
	p = rot2(2.02) * p;
	p *= 1.96;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.44 + time * 0.04, vec3(0.53, 0.54, 0.60), vec3(0.44, 0.35, 0.31), vec3(1.02, 1.30, 1.21), vec3(0.77, 0.69, 0.82));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.79));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
