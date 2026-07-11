uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 19.82 + t * 2.58 + ph) * 0.7;
    float wb = sin(p.y * 12.72 - t * 3.71 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.32;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.89;
	p += vec2(-0.93, 0.04) * sin(length(p) * 5.99 - time * 1.53) * 0.10;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.04), field(p, time, 2.08));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
