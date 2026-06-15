uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.69 + t * 1.61 + ph) + sin(p.y * 8.31 - t * 1.61 + ph)
        + sin((p.x + p.y) * 2.18 + t * 1.61 + ph) + sin(length(p) * 4.32 - t * 1.61 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.39;
	{ p = vec2(atan(p.y, p.x) * 1.96, length(p) * 5.43 - time * 0.42); }
	p *= 2.73;
	p = abs(p);
	p = rot2(p.y * -1.09 + time * 0.27) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.54), field(p, time, 1.08));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.76));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
