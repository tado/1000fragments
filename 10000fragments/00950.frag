uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.41 + t * 4.95 + ph) + sin(p.y * 10.13 - t * 4.95 + ph)
        + sin((p.x + p.y) * 9.46 + t * 4.95 + ph) + sin(length(p) * 10.13 - t * 4.95 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ p = vec2(atan(p.y, p.x) * 2.53, length(p) * 3.88 - time * 0.50); }
	p = rot2(2.85) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.82), field(p, time, 1.64));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.00);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
