uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.23 + t * 3.81 + ph) + sin(p.y * 13.92 - t * 3.81 + ph)
        + sin((p.x + p.y) * 9.94 + t * 3.81 + ph) + sin(length(p) * 8.15 - t * 3.81 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.66;
	p = rot2(time * 0.81) * p;
	p += vec2(-0.85, -0.72) * sin(length(p) * 4.88 - time * 1.37) * 0.23;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.69, lr * 2.72 + time * 0.42); }
	p = rot2(p.y * -3.74 + time * 0.47) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.29, 0.04, 0.21), vec3(0.88, 0.52, 0.61), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
