uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.32 + t * 3.44 + ph) + sin(p.y * 8.23 - t * 3.44 + ph)
        + sin((p.x + p.y) * 9.55 + t * 3.44 + ph) + sin(length(p) * 5.45 - t * 3.44 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * -1.74 + time * 0.93) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.32, lr * 1.46 + time * 0.27); }
	p += vec2(-0.73, 0.78) * sin(length(p) * 3.70 - time * 1.60) * 0.29;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.31), field(p, time, 2.62));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
