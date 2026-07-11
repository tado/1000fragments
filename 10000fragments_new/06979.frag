uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.37;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.75; kp = rot2(1.91) * kp; kp *= 1.30; }
    v = sin(kp.x * 2.00 - t * 1.74 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.43), cos(time * 1.00)) * 0.21;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.88 / 3.1415927, 0.54 / r - time * 1.76);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.20, 0.70, 0.99) + vec3(0.14, 0.18, 0.15);
	col *= clamp(r * 2.16, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.80 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
