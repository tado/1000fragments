uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.43 + t * 0.54 + ph) + sin(p.y * 6.79 - t * 0.54 + ph)
        + sin((p.x + p.y) * 9.80 + t * 0.54 + ph) + sin(length(p) * 8.84 - t * 0.54 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.86;
	p *= 1.0 + 0.20 * sin(time * 3.98);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.88), field(p, time, 1.76));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
