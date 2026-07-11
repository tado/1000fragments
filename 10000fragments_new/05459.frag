uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 8.0 + qr * 5.06 * sin(t * 1.23) + t * 3.70 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.56; p = rot2(0.45) * p; }
	p = rot2(p.y * -1.69 + time * 0.61) * p;
	{ float fr = length(p); p *= 1.0 + -0.62 * fr * fr; }
	p += vec2(-0.55, -0.46) * sin(length(p) * 3.16 - time * 1.28) * 0.21;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.64 + time * 0.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
