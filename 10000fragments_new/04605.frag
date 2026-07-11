uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.02 + sr * 7.34 - t * 2.84 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.26;
	p = fract(p * 2.86) - 0.5;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.54; p = rot2(1.51) * p; }
	p += vec2(-0.98, -0.25) * sin(length(p) * 2.47 - time * 1.66) * 0.27;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.09, 0.02, 0.35), vec3(0.83, 0.53, 0.93), d);
	col *= 0.84 + 0.12 * sin(gl_FragCoord.y * 2.43 + time * 12.38);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
