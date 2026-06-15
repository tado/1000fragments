uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.53 + t * 2.86 + ph) + sin(p.y * 2.88 - t * 2.86 + ph)
        + sin((p.x + p.y) * 5.71 + t * 2.86 + ph) + sin(length(p) * 5.41 - t * 2.86 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = abs(p);
	p *= 3.21;
	p = rot2(p.y * -3.93 + time * 0.60) * p;
	{ p = vec2(atan(p.y, p.x) * 1.03, length(p) * 5.07 - time * 0.73); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.89), field(p, time, 1.78));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.48);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
