uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.27 + t * 0.52 + ph) + sin(p.y * 11.18 - t * 0.52 + ph)
        + sin((p.x + p.y) * 9.97 + t * 0.52 + ph) + sin(length(p) * 12.71 - t * 0.52 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.03;
	p = fract(p * 2.26) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.44), field(p, time, 0.88));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
