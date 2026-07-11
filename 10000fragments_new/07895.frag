uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 5.57 + t * 1.41 + ph) * 0.7;
    float wb = sin(p.y * 12.25 - t * 2.18 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.54;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.31), field(p, time, 0.62));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.06, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
