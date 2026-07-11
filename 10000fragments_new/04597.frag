uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 8.76 + t * 1.69 + ph) * 0.7;
    float wb = sin(p.y * 6.02 - t * 3.66 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.75;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.86;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.93), field(p, time, 1.86));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
