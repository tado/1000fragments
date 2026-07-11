uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.89 + t * 2.32 + ph) + sin(p.y * 3.23 - t * 2.32 + ph)
        + sin((p.x + p.y) * 6.57 + t * 2.32 + ph) + sin(length(p) * 4.49 - t * 2.32 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.41;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.73), field(p, time, 1.47));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
