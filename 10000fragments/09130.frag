uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.08 + t * 2.43 + ph) + sin(p.y * 9.33 - t * 2.43 + ph)
        + sin((p.x + p.y) * 5.78 + t * 2.43 + ph) + sin(length(p) * 10.43 - t * 2.43 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.20;
	{ p = vec2(atan(p.y, p.x) * 1.41, length(p) * 4.64 - time * 0.62); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.90), field(p, time, 1.79));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.52));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
