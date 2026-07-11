uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.49 + t * 2.61 + ph) + sin(p.y * 8.59 - t * 2.61 + ph)
        + sin((p.x + p.y) * 5.07 + t * 2.61 + ph) + sin(length(p) * 4.24 - t * 2.61 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * -0.29) * p;
	p = fract(p * 2.25) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 2.38, length(p) * 2.45 - time * 0.16); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.27, 0.43, 0.02), vec3(0.77, 1.00, 0.64), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
