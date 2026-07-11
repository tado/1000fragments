uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 11.14 + t * 1.88 + ph) * 0.7;
    float wb = sin(p.y * 13.89 - t * 0.74 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.77;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 2.39) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.59), field(p, time, 1.18));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
