uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.17;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.73; kp = rot2(1.09) * kp; kp *= 1.44; }
    v = sin(kp.y * 2.84 - t * 4.81 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.59;
	p = rot2(1.71) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.63 + time * 0.10);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
