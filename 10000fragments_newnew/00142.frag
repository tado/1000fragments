uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.83;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.41; kp = rot2(1.62) * kp; kp *= 1.23; }
    v = sin(kp.x * 2.14 - t * 1.38 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.96), cos(time * 0.81)) * 0.14;
	float an = atan(p.y, p.x) + time * -0.52;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.12 / 3.1415927, 0.66 / r - time * 3.00);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.36 + time * 0.18);
	col *= clamp(r * 2.20, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.93 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
