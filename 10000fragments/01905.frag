uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.47 + sr * 19.61 - t * 3.08 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.34;
	p = rot2(p.y * -2.93 + time * 0.90) * p;
	p = rot2(1.61) * p;
	p += vec2(0.64, 0.43) * sin(length(p) * 2.29 - time * 1.77) * 0.17;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.32, 0.88, 0.66) + vec3(0.13, 0.19, 0.12);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
