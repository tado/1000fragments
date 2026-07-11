uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.95 + t * 3.05 + ph) + sin(p.y * 8.61 - t * 3.05 + ph)
        + sin((p.x + p.y) * 9.32 + t * 3.05 + ph) + sin(length(p) * 10.47 - t * 3.05 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.03;
	p *= 1.88;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.95), field(p, time, 1.91));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
