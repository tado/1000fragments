uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.22, 0.0)) * 14.51 - t * 6.33 + ph);
    float mb = sin(length(p + vec2(0.22, 0.0)) * 39.59 - t * 6.33 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.33;
	p += vec2(0.57, -0.05) * sin(length(p) * 2.84 - time * 0.68) * 0.32;
	p = rot2(time * -1.36) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.02, 0.02, 0.56), vec3(0.59, 0.57, 0.72), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
