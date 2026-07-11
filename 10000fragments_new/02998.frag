uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.09;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.56; kp = rot2(2.43) * kp; kp *= 1.42; }
    v = sin(kp.x * 2.61 - t * 3.87 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.18;
	p.y += sin(p.x * 5.83 + time * 1.33) * 0.36;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.80 + time * 0.27);
	col *= 0.80 + 0.11 * sin(gl_FragCoord.y * 1.91 + time * 12.41);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
