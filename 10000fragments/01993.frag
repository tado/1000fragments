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
    v = sin(sa * 10.76 + sr * 5.89 - t * 0.71 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.99;
	p *= 1.71;
	p = rot2(0.86) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.29 + time * 0.24);
	col = mod(col * 2.25, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
