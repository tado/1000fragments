uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 17.12 + t * 2.73 + ph) * 0.7;
    float wb = sin(p.y * 4.04 - t * 3.95 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.21;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.70), field(p, time, 1.40));
	col = 0.5 + 0.5 * col;
	col *= 0.81 + 0.20 * sin(gl_FragCoord.y * 2.64 + time * 12.18);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
