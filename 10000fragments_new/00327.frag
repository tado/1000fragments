uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.20;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.56; kp = rot2(2.02) * kp; kp *= 1.19; }
    v = sin(kp.x * 3.93 - t * 4.95 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.64 / 3.1415927, 0.56 / r - time * 2.22);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.19 + time * 0.05);
	col *= clamp(r * 1.89, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.10 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
