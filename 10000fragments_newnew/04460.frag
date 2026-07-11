uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.96;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.40; kp = rot2(0.76) * kp; kp *= 1.36; }
    v = sin(kp.y * 3.33 - t * 3.15 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.15), cos(time * 1.26)) * 0.26;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.12 / 3.1415927, 1.18 / r - time * 2.44);
	tv.x += tv.y * 0.11;
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.21 + time * 0.04);
	col *= clamp(r * 1.41, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.41 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
