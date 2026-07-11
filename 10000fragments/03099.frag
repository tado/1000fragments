uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 9.13 + vec2(t * 0.58, -t * 0.58) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.37;
	p = abs(p) - 0.54;
	p = rot2(p.y * 3.86 + time * 0.85) * p;
	p = rot2(length(p) * 1.70 + time * 1.01) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.18; p = rot2(0.72) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.69 + time * 0.26, vec3(0.59, 0.40, 0.60), vec3(0.41, 0.44, 0.39), vec3(0.98, 1.02, 1.26), vec3(0.78, 0.89, 0.32));
	col = fract(col * 1.82);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
