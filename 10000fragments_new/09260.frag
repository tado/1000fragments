uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.37 + 0.12 * cos(sa * 5.0 + t * 2.95 + ph);
    v = sin((sr - petal) * 15.90);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.40;
	p = fract(p * 2.46) - 0.5;
	{ float fr = length(p); p *= 1.0 + -0.70 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 2.22, length(p) * 3.18 - time * 0.23); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.04 + time * 0.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
