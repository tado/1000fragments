uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.49, 0.0)) * 38.55 - t * 7.58 + ph);
    float mb = sin(length(p + vec2(0.49, 0.0)) * 9.93 - t * 7.58 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.16;
	p *= 1.53;
	{ p = vec2(atan(p.y, p.x) * 2.15, length(p) * 2.27 - time * 0.35); }
	p += vec2(0.05, 0.13) * sin(length(p) * 2.14 - time * 1.51) * 0.36;
	p = fract(p * 2.10) - 0.5;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.26, 0.45, 0.16), vec3(0.94, 1.00, 0.69), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
