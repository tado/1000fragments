uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.69 + vec2(t * 1.84, -t * 1.84) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.86;
	p = rot2(time * 0.54) * p;
	p = rot2(2.42) * p;
	p += vec2(0.67, 0.84) * sin(length(p) * 4.38 - time * 0.74) * 0.35;
	p = rot2(length(p) * -2.54 + time * 0.68) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.08 + time * 0.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
