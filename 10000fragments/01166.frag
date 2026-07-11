uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.00 + t * 1.21 + ph) + sin(p.y * 9.35 - t * 1.21 + ph)
        + sin((p.x + p.y) * 11.67 + t * 1.21 + ph) + sin(length(p) * 14.49 - t * 1.21 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(0.91, 0.82) * sin(length(p) * 3.12 - time * 1.47) * 0.14;
	p = fract(p * 2.80) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.35), field(p, time, 2.70));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
