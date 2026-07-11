uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.97 + t * 2.49 + ph) + sin(p.y * 7.40 - t * 2.49 + ph)
        + sin((p.x + p.y) * 10.58 + t * 2.49 + ph) + sin(length(p) * 7.67 - t * 2.49 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p.y += sin(p.x * 4.78 + time * 2.13) * 0.29;
	p = (floor(p * 27.1) + 0.5) / 27.1;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.04), field(p, time, 2.08));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
