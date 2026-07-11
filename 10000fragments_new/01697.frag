uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.98;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.52; kp = rot2(2.62) * kp; kp *= 1.29; }
    v = sin(kp.y * 1.54 - t * 4.53 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.53), cos(time * 0.42)) * 0.29;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.88 / 3.1415927, 0.88 / r - time * 2.46);
	tv.x += tv.y * 0.15;
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.17 + time * 0.32);
	col *= clamp(r * 2.71, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
