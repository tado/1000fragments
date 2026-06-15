uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.03 + t * 3.07 + ph) + sin(p.y * 3.13 - t * 3.07 + ph)
        + sin((p.x + p.y) * 10.25 + t * 3.07 + ph) + sin(length(p) * 3.79 - t * 3.07 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.52;
	{ float fr = length(p); p *= 1.0 + -0.71 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.73), field(p, time, 1.47));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
