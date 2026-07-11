uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.75, t * 2.37 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.21;
	p = rot2(2.79) * p;
	p = rot2(time * 0.55) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.57; p = rot2(0.49) * p; }
	p += vec2(0.86, 0.89) * sin(length(p) * 5.03 - time * 1.83) * 0.15;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.34, 0.15, 0.09), vec3(0.69, 0.69, 0.59), d);
	col = clamp((col - 0.5) * 1.76 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
