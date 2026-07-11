uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.00 + vec2(t * 0.65, -t * 0.65) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.58;
	p = fract(p * 2.20) - 0.5;
	p = rot2(length(p) * 1.26 + time * 0.52) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.22; p = rot2(0.44) * p; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.47, 0.04, 0.18), vec3(0.88, 0.92, 0.85), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.83));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
