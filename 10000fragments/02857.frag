uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.44 + t * 1.47 + ph) + sin(p.y * 13.13 - t * 1.47 + ph)
        + sin((p.x + p.y) * 2.58 + t * 1.47 + ph) + sin(length(p) * 5.09 - t * 1.47 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 1.15, length(p) * 2.59 - time * 0.45); }
	p = abs(p);
	p = rot2(time * -0.93) * p;
	p *= 3.10;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.24), field(p, time, 2.47));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.65);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
