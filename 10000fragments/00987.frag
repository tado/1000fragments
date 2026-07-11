uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.19 + t * 3.66 + ph) + sin(p.y * 11.17 - t * 3.66 + ph)
        + sin((p.x + p.y) * 8.30 + t * 3.66 + ph) + sin(length(p) * 9.90 - t * 3.66 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.94;
	p *= 3.28;
	p += vec2(0.33, 0.79) * sin(length(p) * 4.27 - time * 1.23) * 0.16;
	p = abs(p) - 0.73;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.47), field(p, time, 0.95));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
