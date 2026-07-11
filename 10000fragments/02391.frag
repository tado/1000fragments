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
    float petal = 0.68 + 0.28 * cos(sa * 9 + t * 1.99 + ph);
    v = sin((sr - petal) * 12.59);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(p.y * 2.27 + time * 0.44) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.56; p = rot2(0.48) * p; }
	{ float fr = length(p); p *= 1.0 + 0.33 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.92 + time * 0.13);
	col = fract(col * 2.31);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
