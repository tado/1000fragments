uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 13.23 + sin(p.y * 3.47 + t * 4.58) * 3.90 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 1.87) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 1.98, length(p) * 5.05 - time * 0.13); }
	p = rot2(p.y * 3.55 + time * 0.53) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.18, 0.38, 0.51), vec3(0.98, 0.57, 0.95), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
