uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 6.02 + t * 3.49 + ph) * 0.7;
    float wb = sin(p.y * 13.63 - t * 2.34 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.64;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.32;
	{ float fr = length(p); p *= 1.0 + 0.53 * fr * fr; }
	p = fract(p * 2.83) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.93), field(p, time, 1.86));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
