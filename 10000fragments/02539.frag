uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.41 + 0.11 * cos(sa * 3 + t * 0.74 + ph);
    v = sin((sr - petal) * 6.13);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.86;
	p += vec2(-0.84, 0.03) * sin(length(p) * 2.40 - time * 1.30) * 0.23;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.45; p = rot2(0.77) * p; }
	p = rot2(p.y * 2.04 + time * 0.17) * p;
	p = rot2(1.69) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.35, 0.29, 0.10), vec3(0.88, 0.62, 0.88), d);
	col = clamp((col - 0.5) * 1.80 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
