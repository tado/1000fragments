uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.19;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.44; kp = rot2(2.36) * kp; kp *= 1.24; }
    v = sin(kp.y * 1.54 - t * 1.91 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.62;
	p = fract(p * 1.36) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.96 + time * 0.29);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
