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
    float petal = 0.64 + 0.10 * cos(sa * 4 + t * 1.88 + ph);
    v = sin((sr - petal) * 15.93);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.01;
	{ p = vec2(atan(p.y, p.x) * 1.83, length(p) * 3.46 - time * 0.25); }
	p = rot2(length(p) * -2.93 + time * 0.54) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.70 + time * 0.22);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.75));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
