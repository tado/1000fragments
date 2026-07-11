uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 21.49 - t * 6.14 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.42;
	p = rot2(time * -0.84) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.12, lr * 2.56 + time * -0.55); }
	p = fract(p * 1.75) - 0.5;
	p = rot2(length(p) * -2.48 + time * 1.02) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.14, 0.50, 0.18), vec3(0.87, 0.87, 0.83), d);
	col *= 0.85 + 0.17 * sin(gl_FragCoord.y * 1.94 + time * 17.90);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
