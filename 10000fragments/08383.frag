uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.70;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.68; kp = rot2(2.06) * kp; kp *= 1.21; }
    v = sin(kp.y * 1.28 - t * 1.97 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.95), cos(time * 1.06)) * 0.17;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.08 / 3.1415927, 0.46 / r - time * 2.70);
	tv.x += tv.y * 0.17;
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.62 + time * 0.50);
	col *= clamp(r * 1.64, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.14));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
