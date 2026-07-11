uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.64 + t * 2.80 + ph) + sin(p.y * 9.49 - t * 2.80 + ph)
        + sin((p.x + p.y) * 6.97 + t * 2.80 + ph) + sin(length(p) * 11.08 - t * 2.80 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.19), field(p, time, 2.38));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.83);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
