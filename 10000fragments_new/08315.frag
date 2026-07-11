uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 7.09 + t * 2.98 + ph) * 0.7;
    float wb = sin(p.y * 11.38 - t * 3.48 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.76;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.39;
	p = (floor(p * 14.4) + 0.5) / 14.4;
	p = fract(p * 2.40) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.84), field(p, time, 1.67));
	col = 0.5 + 0.5 * col;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.40 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
