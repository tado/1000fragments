uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 12.20 + t * 4.00 + ph) * 0.7;
    float wb = sin(p.y * 10.69 - t * 3.36 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.58;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.33;
	p.y += sin(p.x * 5.19 + time * 2.87) * 0.32;
	{ float fr = length(p); p *= 1.0 + -0.30 * fr * fr; }
	p = (floor(p * 23.9) + 0.5) / 23.9;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.37), field(p, time, 0.74));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
