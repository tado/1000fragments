uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.37;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.76; kp = rot2(1.91) * kp; kp *= 1.29; }
    v = sin(kp.x * 3.13 - t * 2.08 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.10), cos(time * 0.44)) * 0.05;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.17 / 3.1415927, 1.19 / r + time * 1.90);
	tv.x += tv.y * 0.35;
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.27 + time * 0.29);
	col *= clamp(r * 1.38, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
