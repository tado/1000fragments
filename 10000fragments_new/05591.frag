uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.38;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.78; kp = rot2(2.34) * kp; kp *= 1.19; }
    v = sin(kp.x * 3.15 - t * 3.51 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.15), cos(time * 1.47)) * 0.28;
	float an = atan(p.y, p.x) + time * 0.25;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.97 / 3.1415927, 0.60 / r + time * 1.67);
	float d = field(tv, time, 0.0);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 1.78 + time * 0.84);
	col *= clamp(r * 1.17, 0.0, 1.0);
	col = mod(col * 1.57, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
