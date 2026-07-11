uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.36;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.48; kp = rot2(2.00) * kp; kp *= 1.22; }
    v = sin(kp.x * 1.97 - t * 1.91 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.71;
	p = (floor(p * 29.3) + 0.5) / 29.3;
	{ p = vec2(atan(p.y, p.x) * 1.17, length(p) * 6.00 - time * 0.69); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.91 + time * 0.29);
	col = mod(col * 1.75, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
