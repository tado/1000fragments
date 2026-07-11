uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 7.04 + t * 3.21 + ph) * 0.7;
    float wb = sin(p.y * 14.40 - t * 2.63 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.27;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.26;
	p *= 2.44;
	p = (floor(p * 9.6) + 0.5) / 9.6;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.99), field(p, time, 1.98));
	col = 0.5 + 0.5 * col;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.62 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
