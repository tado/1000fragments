uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.59 + t * 1.80 + ph) + sin(p.y * 3.34 - t * 1.80 + ph)
        + sin((p.x + p.y) * 5.51 + t * 1.80 + ph) + sin(length(p) * 13.98 - t * 1.80 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.80), field(p, time, 1.60));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.69 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
