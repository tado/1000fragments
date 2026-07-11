uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 13.98 + t * 0.96 + ph) * 0.7;
    float wb = sin(p.y * 17.16 - t * 3.82 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.26;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.01;
	{ p = vec2(atan(p.y, p.x) * 2.17, length(p) * 2.27 - time * 0.23); }
	p = abs(p);
	{ float fr = length(p); p *= 1.0 + 0.60 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.23), field(p, time, 2.46));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
