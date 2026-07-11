uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.39 + t * 3.28 + ph) + sin(p.y * 12.11 - t * 3.28 + ph)
        + sin((p.x + p.y) * 3.13 + t * 3.28 + ph) + sin(length(p) * 8.62 - t * 3.28 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.04;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.35), field(p, time, 0.70));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.45);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
