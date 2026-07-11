uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.34, 0.0)) * 32.93 - t * 7.68 + ph);
    float mb = sin(length(p + vec2(0.34, 0.0)) * 36.12 - t * 7.68 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(length(p) * 3.41 + time * 1.12) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.03, 0.03, 0.10), vec3(0.61, 0.54, 0.70), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
