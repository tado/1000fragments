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
    float petal = 0.47 + 0.12 * cos(sa * 5 + t * 1.13 + ph);
    v = sin((sr - petal) * 10.18);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.75;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.50; p = rot2(0.65) * p; }
	{ float fr = length(p); p *= 1.0 + 0.70 * fr * fr; }
	p = rot2(length(p) * 1.62 + time * 0.61) * p;
	p = rot2(time * -0.94) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.60 + time * 0.22);
	col = mod(col * 2.21, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
