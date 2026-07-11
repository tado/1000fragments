uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.71 + vec2(t * 2.66, -t * 2.66) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.85;
	p *= 2.76;
	p = rot2(length(p) * -1.60 + time * 0.33) * p;
	p += vec2(-0.52, -0.50) * sin(length(p) * 3.65 - time * 1.12) * 0.15;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.52, lr * 1.82 + time * -0.54); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.61 + time * 0.18);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
