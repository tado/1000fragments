uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.96 + sr * 12.65 - t * 2.30 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.54;
	{ float fr = length(p); p *= 1.0 + 0.69 * fr * fr; }
	p += vec2(0.16, -0.18) * sin(length(p) * 2.66 - time * 1.50) * 0.11;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.32), field(p, time, 2.65));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
