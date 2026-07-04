uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 18.73 + t * 1.56 + ph) * 0.7;
    float wb = sin(p.y * 18.40 - t * 3.06 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.45;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.89;
	p = sin(p * 2.57 + time * 2.23) * 1.32;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.40), field(p, time, 0.81));
	col = 0.5 + 0.5 * col;
	col *= 0.81 + 0.11 * sin(gl_FragCoord.y * 1.04 + time * 13.71);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
