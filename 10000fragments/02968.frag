uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.93 + vec2(t * 2.06, -t * 2.06) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -0.41) * p;
	{ p = vec2(atan(p.y, p.x) * 1.33, length(p) * 3.31 - time * 0.68); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.50 + time * 0.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
