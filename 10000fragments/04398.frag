uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.26 + t * 4.04 + ph) + sin(p.y * 6.00 - t * 4.04 + ph)
        + sin((p.x + p.y) * 9.71 + t * 4.04 + ph) + sin(length(p) * 9.67 - t * 4.04 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.95;
	p = rot2(length(p) * 2.02 + time * 0.84) * p;
	p += vec2(-0.88, 0.92) * sin(length(p) * 5.23 - time * 1.88) * 0.35;
	p = rot2(p.y * -2.10 + time * 0.76) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.80, 0.50, 0.63) + vec3(0.03, 0.04, 0.16);
	col = clamp((col - 0.5) * 1.77 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
