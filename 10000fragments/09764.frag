uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 13.04 + t * 3.44 + ph) + sin(p.y * 17.35 - t * 4.78 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.25;
	p = rot2(p.y * 3.76 + time * 0.25) * p;
	{ p = vec2(atan(p.y, p.x) * 2.29, length(p) * 2.91 - time * 0.23); }
	p += vec2(-0.55, 0.03) * sin(length(p) * 5.00 - time * 1.06) * 0.31;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.01), field(p, time, 2.02));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.82));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
