uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.62 + t * 4.79 + ph) + sin(p.y * 9.86 - t * 4.79 + ph)
        + sin((p.x + p.y) * 5.35 + t * 4.79 + ph) + sin(length(p) * 16.81 - t * 4.79 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.22;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.35), field(p, time, 2.70));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
