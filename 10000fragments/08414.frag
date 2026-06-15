uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.05 + t * 0.63 + ph) + sin(p.y * 7.98 - t * 0.63 + ph)
        + sin((p.x + p.y) * 9.88 + t * 0.63 + ph) + sin(length(p) * 14.09 - t * 0.63 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.61;
	p = rot2(time * 1.06) * p;
	p = rot2(p.y * 2.84 + time * 0.22) * p;
	{ p = vec2(atan(p.y, p.x) * 1.39, length(p) * 4.49 - time * 0.74); }
	p = rot2(0.49) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.39), field(p, time, 2.78));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.42));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
