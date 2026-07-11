uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.80;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.58; kp = rot2(0.70) * kp; kp *= 1.44; }
    v = sin(kp.y * 3.55 - t * 3.57 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.39;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.06 / 3.1415927, 1.20 / r - time * 0.80);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.66 + time * 0.24);
	col *= clamp(r * 1.93, 0.0, 1.0);
	col *= 0.85 + 0.18 * sin(gl_FragCoord.y * 2.43 + time * 5.66);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
