uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.67 + sr * 7.58 - t * 2.51 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.87;
	{ p = vec2(atan(p.y, p.x) * 1.75, length(p) * 2.83 - time * 0.96); }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.59; p = rot2(2.04) * p; }
	p = (floor(p * 13.6) + 0.5) / 13.6;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.22, 0.05, 0.46), vec3(0.68, 0.60, 0.78), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
