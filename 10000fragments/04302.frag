uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.53 + t * 2.73 + ph) + sin(p.y * 12.89 - t * 2.73 + ph)
        + sin((p.x + p.y) * 2.02 + t * 2.73 + ph) + sin(length(p) * 7.84 - t * 2.73 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float fr = length(p); p *= 1.0 + 0.73 * fr * fr; }
	p = abs(p);
	{ p = vec2(atan(p.y, p.x) * 2.12, length(p) * 3.93 - time * 0.21); }
	p = fract(p * 1.35) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.58), field(p, time, 1.16));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.62));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
