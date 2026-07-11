uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.01 + sr * 19.38 - t * 0.86 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.83;
	p += vec2(-0.79, -0.31) * sin(length(p) * 3.84 - time * 0.97) * 0.31;
	{ p = vec2(atan(p.y, p.x) * 2.67, length(p) * 2.25 - time * 0.65); }
	p = rot2(p.y * 3.27 + time * 1.17) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.88 + time * 0.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
