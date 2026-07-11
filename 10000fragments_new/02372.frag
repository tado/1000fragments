uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 5.19 + t * 3.94 + ph) * 0.7;
    float wb = sin(p.y * 16.42 - t * 3.53 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.32;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(0.22, 0.43) * sin(length(p) * 4.66 - time * 1.93) * 0.34;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.79), field(p, time, 1.58));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
