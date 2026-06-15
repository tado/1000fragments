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
    float petal = 0.56 + 0.14 * cos(sa * 9 + t * 0.86 + ph);
    v = sin((sr - petal) * 11.68);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 2.71) - 0.5;
	{ float fr = length(p); p *= 1.0 + -0.23 * fr * fr; }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.54; p = rot2(1.53) * p; }
	{ p = vec2(atan(p.y, p.x) * 1.66, length(p) * 4.40 - time * 0.65); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.12 + time * 0.01);
	col = mod(col * 1.45, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
