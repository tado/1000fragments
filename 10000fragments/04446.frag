uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.33, 0.0)) * 14.31 - t * 5.05 + ph);
    float mb = sin(length(p + vec2(0.33, 0.0)) * 22.18 - t * 5.05 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.08;
	p = rot2(length(p) * 2.88 + time * 0.99) * p;
	p += vec2(-0.98, -0.11) * sin(length(p) * 2.73 - time * 0.70) * 0.20;
	{ p = vec2(atan(p.y, p.x) * 2.32, length(p) * 4.88 - time * 0.74); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.43, 0.18, 0.57), vec3(0.62, 0.84, 0.45), d);
	col = clamp((col - 0.5) * 1.31 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
