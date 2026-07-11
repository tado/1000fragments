uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 17.18 + t * 0.59 + ph) * 0.7;
    float wb = sin(p.y * 4.46 - t * 2.08 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.46;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.86;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.18), field(p, time, 2.37));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
