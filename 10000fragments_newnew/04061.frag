uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 10.22 + t * 3.56 + ph) * 0.7;
    float wb = sin(p.y * 7.06 - t * 3.07 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.41;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.57;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.14, 0.85, 1.20) + vec3(0.07, 0.22, 0.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
