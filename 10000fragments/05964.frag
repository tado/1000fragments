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
    v = sin(sa * 11.50 + sr * 11.88 - t * 3.47 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.17;
	p *= 2.04;
	p = rot2(time * 0.66) * p;
	{ float fr = length(p); p *= 1.0 + 0.32 * fr * fr; }
	p = abs(p) - 0.51;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.88 + time * 0.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
