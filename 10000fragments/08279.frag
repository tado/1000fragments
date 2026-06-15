uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.65 + sr * 8.52 - t * 1.90 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.44;
	{ float fr = length(p); p *= 1.0 + -0.43 * fr * fr; }
	p += vec2(-0.25, 0.11) * sin(length(p) * 5.04 - time * 1.35) * 0.36;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.96), field(p, time, 1.93));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
