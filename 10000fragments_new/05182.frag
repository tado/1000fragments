uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.61 + t * 3.21 + ph) + sin(p.y * 6.70 - t * 3.21 + ph)
        + sin((p.x + p.y) * 6.69 + t * 3.21 + ph) + sin(length(p) * 8.61 - t * 3.21 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.28;
	p = rot2(p.y * 1.89 + time * 1.17) * p;
	p *= 2.92;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.42, 0.85, 0.95) * (0.14 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col *= 0.84 + 0.17 * sin(gl_FragCoord.y * 2.95 + time * 12.76);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
