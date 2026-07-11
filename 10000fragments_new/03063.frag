uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.68;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.56; kp = rot2(0.79) * kp; kp *= 1.44; }
    v = sin(kp.y * 2.24 - t * 4.71 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.65 / 3.1415927, 0.36 / r + time * 2.68);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.44, 0.32, 0.21) * (0.19 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col *= clamp(r * 2.01, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.18 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
