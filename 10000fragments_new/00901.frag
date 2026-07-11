uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.84 + t * 4.83 + ph) + sin(p.y * 5.64 - t * 4.83 + ph)
        + sin((p.x + p.y) * 2.43 + t * 4.83 + ph) + sin(length(p) * 9.49 - t * 4.83 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.76;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.78), field(p, time, 1.56));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
