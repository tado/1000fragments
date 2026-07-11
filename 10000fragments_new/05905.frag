uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.06;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.45; kp = rot2(0.51) * kp; kp *= 1.26; }
    v = sin(kp.y * 1.14 - t * 3.05 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.92), cos(time * 0.47)) * 0.22;
	float an = atan(p.y, p.x) + time * -0.79;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.76 / 3.1415927, 0.73 / r - time * 1.76);
	tv.x += tv.y * 0.45;
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.00 + time * 0.05);
	col *= clamp(r * 2.64, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.00));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
