uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.88 + t * 0.61 + ph) + sin(p.y * 5.14 - t * 0.61 + ph)
        + sin((p.x + p.y) * 7.27 + t * 0.61 + ph) + sin(length(p) * 14.36 - t * 0.61 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = fract(p * 1.19) - 0.5;
	p = rot2(time * -1.55) * p;
	p = sin(p * 1.90 + time * 2.25) * 0.86;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.25, 0.17, 0.77) * (0.08 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	col *= 0.90 + 0.16 * sin(gl_FragCoord.y * 1.13 + time * 11.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
