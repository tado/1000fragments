uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.87 + t * 1.42 + ph) + sin(p.y * 13.52 - t * 1.42 + ph)
        + sin((p.x + p.y) * 6.10 + t * 1.42 + ph) + sin(length(p) * 17.86 - t * 1.42 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.21), field(p, time, 2.41));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.77 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
