uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 16.26 + t * 1.11 + ph) * 0.7;
    float wb = sin(p.y * 10.69 - t * 1.40 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.35;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.78;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.02, 1.03, 0.72) + vec3(0.20, 0.16, 0.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
