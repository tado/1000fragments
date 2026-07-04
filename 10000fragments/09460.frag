uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.45;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.59; kp = rot2(2.67) * kp; kp *= 1.43; }
    v = sin(kp.y * 3.26 - t * 2.86 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 0.90) * p;
	{ p = vec2(atan(p.y, p.x) * 1.36, length(p) * 3.50 - time * 0.43); }
	{ float fr = length(p); p *= 1.0 + 0.56 * fr * fr; }
	p = (floor(p * 10.8) + 0.5) / 10.8;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.52 + time * 0.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
