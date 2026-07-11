uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 8.12 + t * 0.59 + ph) * 0.7;
    float wb = sin(p.y * 18.59 - t * 0.93 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.23;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.02;
	{ p = vec2(atan(p.y, p.x) * 2.38, length(p) * 5.35 - time * 0.74); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.33), field(p, time, 0.65));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
