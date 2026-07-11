uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.64 + t * 4.91 + ph) + sin(p.y * 3.11 - t * 4.91 + ph)
        + sin((p.x + p.y) * 6.15 + t * 4.91 + ph) + sin(length(p) * 6.09 - t * 4.91 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.38;
	p = rot2(p.y * -3.43 + time * 0.83) * p;
	p *= 1.57;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.14), field(p, time, 2.29));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.64, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
