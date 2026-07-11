uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.39, 0.0)) * 26.10 - t * 1.95 + ph);
    float mb = sin(length(p + vec2(0.39, 0.0)) * 39.54 - t * 1.95 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.11;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.53; p = rot2(2.53) * p; }
	{ p = vec2(atan(p.y, p.x) * 1.38, length(p) * 4.43 - time * 0.72); }
	p = rot2(p.y * -1.18 + time * 0.34) * p;
	p = fract(p * 2.03) - 0.5;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.31, 0.24, 0.03), vec3(0.96, 0.56, 0.75), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.39));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
