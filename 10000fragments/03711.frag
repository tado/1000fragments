uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.74) - 0.5;
    float rad = 0.29 + 0.12 * sin(t * 0.90 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(p.y * -1.70 + time * 0.36) * p;
	p += vec2(0.41, -0.77) * sin(length(p) * 3.11 - time * 1.88) * 0.18;
	p *= 2.39;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.80, lr * 1.86 + time * -0.14); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.84), field(p, time, 1.68));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
